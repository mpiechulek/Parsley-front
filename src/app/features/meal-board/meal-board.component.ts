import { DatePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FoodStore } from 'app/state/food.state';
import { FoodModel, FoodResponse } from '@models/food.model';
import { DailyMealsModel, MealModel } from '@models/meal.model';
import { ApiService } from '@services/api.service';
import { NutrientsCalculationService } from '@services/nutrients-calculation.service';
import { MealCardComponent } from '@shared/components/meal-card/meal-card.component';
import { PageHeaderComponent } from '@shared/components/page-header/page-header.component';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'app-meal-board',
  imports: [MealCardComponent, PageHeaderComponent, MatIconModule, MatButtonModule, DatePipe, MatAccordion],
  templateUrl: './meal-board.component.html',
  styleUrl: './meal-board.component.scss',
})
export class MealBoardComponent {
  apiService = inject(ApiService);
  foodData = signal<FoodModel>({} as FoodModel);
  foodStore = inject(FoodStore);
  nutrientsCalculationService = inject(NutrientsCalculationService);

  mealBoardMeals: DailyMealsModel = {
    date: new Date(),
    meals: [],
    totalDailyMealNutritious: {} as FoodModel,
  };

  currentDate = new Date();
  pickedFood: FoodModel = {} as FoodModel;

  constructor() {
    // TODO: Load from state 1.check state 2.fetch and load .If no records empty array from backend(don't render anything)
    const storeMeals = this.foodStore.dailyMeals();
    if (storeMeals.meals) {
      this.mealBoardMeals = storeMeals;
    }
  }

  /**
   *
   */
  onAddMeal(): void {
    this.mealBoardMeals.meals.push({
      name: `New Meal ${this.mealBoardMeals.meals.length + 1} - `,
      ingredients: [],
      id: new Date().getTime().toString(),
      date: this.currentDate,
      mealNutritious: {} as FoodModel,
    });
  }

  /**
   *
   */
  onDeleteMeal(mealId: string): void {
    this.mealBoardMeals.meals = this.mealBoardMeals.meals.filter((meal) => meal.id !== mealId);
    this.onSaveMeals();
  }

  /**
   *
   */
  onSaveMeals(): void {
    this.foodStore.saveDailyMeals(this.mealBoardMeals);
  }

  /**
   *
   */
  onAddFoodToMeal(searchData: { foodId: string; mealId: string }): void {
    // Check if food is already in meal
    if (this.checkIfFoodAlreadyInMeal(searchData.foodId)) return;

    //Fetch food data
    this.apiService.getFood(searchData.foodId).subscribe((food: FoodResponse) => {
      this.pickedFood = food.data;
      if (food.data) {
        // Add food to meal
        this.addFoodToMeal(searchData.mealId, food.data);
      }
    });
  }

  /**
   *
   * @param foodId
   * @returns boolean
   */
  checkIfFoodAlreadyInMeal(foodId: string): boolean {
    return this.mealBoardMeals.meals.some((meal) =>
      meal.ingredients.some((ingredient) => ingredient.food.id === foodId),
    );
  }

  /**
   *
   */
  addFoodToMeal(mealId: string, foodData: FoodModel): void {
    this.mealBoardMeals.meals.find((meal) => {
      if (meal.id === mealId) {
        meal.ingredients.push({ food: foodData, quantity: 100, unit: 'g' });
        // Recalculate meal total nutrition
        meal.mealNutritious = this.recalculateMealNutrients(meal);
      }
    });
  }

  /**
   *
   * @param foodId
   * @param mealId
   */
  onDeleteFoodFromMeal(data: { name: string; mealId: string }): void {
    this.mealBoardMeals.meals.forEach((meal) => {
      if (meal.id === data.mealId) {
        meal.ingredients = meal.ingredients.filter((ingredient) => {
          return ingredient.food.name !== data.name;
        });
        meal.mealNutritious = this.recalculateMealNutrients(meal);
      }
    });
  }

  /**
   *
   */
  editFoodQuantity(data: { name: string; mealId: string; quantity: number }): void {
    this.mealBoardMeals.meals.find((meal) => {
      if (meal.id === data.mealId) {
        meal.ingredients.find((ingredient) => {
          if (ingredient.food.name === data.name) {
            ingredient.quantity = Number(data.quantity);
            meal.mealNutritious = this.recalculateMealNutrients(meal);
          }
        });
      }
    });
  }

  /**
   *
   */
  recalculateMealNutrients(meal: MealModel): FoodModel {
    return this.nutrientsCalculationService.recalculateMealNutrients(meal);
  }
}
