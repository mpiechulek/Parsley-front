import { DatePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FoodStore } from '@features/food-state/food.state';
import { FoodModel, FoodResponse } from '@models/food.model';
import { DailyMealsModel } from '@models/meal.model';
import { FoodNutritionGroupBase } from '@models/nutrition.model';
import { ApiService } from '@services/api.service';
import { MealCardComponent } from '@shared/components/meal-card/meal-card.component';
import { PageHeaderComponent } from '@shared/components/page-header/page-header.component';

@Component({
  selector: 'app-meal-board',
  imports: [
    MealCardComponent,
    PageHeaderComponent,
    MatIconModule,
    MatButtonModule,
    DatePipe,
  ],
  templateUrl: './meal-board.component.html',
  styleUrl: './meal-board.component.scss',
})
export class MealBoardComponent {
  apiService = inject(ApiService);
  foodData = signal<FoodModel>({} as FoodModel);
  foodStore = inject(FoodStore);

  mealBoardMeals: DailyMealsModel = {
    date: new Date(),
    meals: [],
    totalDailyMealNutritious: {} as FoodNutritionGroupBase,
  };
  currentDate = new Date();
  pickedFood: FoodModel = {} as FoodModel;

  //TODO: If not saved we delete the meal card by creation date in miliseconds,
  //TODO: If we have the id we delete the card first on BE side by id and then if
  //TODO: successful on FE side

  //TODO: Check if food already in meal and if so, do not add it again

  //TODO: Add modal dialog question to confirm delete meal

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
    this.mealBoardMeals.meals = this.mealBoardMeals.meals.filter(
      (meal) => meal.id !== mealId,
    );
  }

  /**
   *
   */
  onAddFoodToMeal(searchData: { foodId: string; mealId: string }): void {
    this.apiService
      .getFood(searchData.foodId)
      .subscribe((food: FoodResponse) => {
        this.pickedFood = food.data;
        if (food.data) {
          this.addFoodToMeal(searchData.mealId, food.data);
        }
      });
  }

  /**
   *
   */
  addFoodToMeal(mealId: string, foodData: FoodModel): void {
    this.mealBoardMeals.meals.find((meal) => {
      if (meal.id === mealId)
        meal.ingredients.push({ food: foodData, quantity: 100, unit: 'g' });
      return meal.id === mealId;
    });
  }
}
