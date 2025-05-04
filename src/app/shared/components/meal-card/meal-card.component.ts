import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { NutrientsDisplayComponent } from '../nutriens-display/nutrients-display.component';
import {
  FoodMealPosition,
  FoodModel,
  FoodShortModel,
} from '@models/food.model';
import { DeleteButtonsComponent } from '../delete-buttons/delete-buttons.component';
import { FoodPositionComponent } from '../food-position/food-position.component';
import { DatePipe } from '@angular/common';
import { EmptyNutrients } from 'app/data/constants/empty-nutrients';

@Component({
  selector: 'app-meal-card',
  imports: [
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatAccordion,
    SearchBarComponent,
    NutrientsDisplayComponent,
    DeleteButtonsComponent,
    FoodPositionComponent,
    DatePipe,
  ],
  templateUrl: './meal-card.component.html',
  styleUrl: './meal-card.component.scss',
})
export class MealCardComponent {
  displayName = false;
  currentDate = new Date();

  title = input<string>('New Meal');
  isExpanded = input<boolean>(false);
  nutrientData = input<FoodModel>(EmptyNutrients as FoodModel);
  selectedFoods = input<FoodMealPosition[]>([] as FoodMealPosition[]);
  mealId = input<string>('');
  foodSearchList = input<FoodShortModel[]>([] as FoodShortModel[]);

  deleteMealEvent = output<string>();
  pickedFoodEvent = output<{ foodId: string; mealId: string }>({});

  /**
   *
   */
  onDeleteMeal(): void {
    this.deleteMealEvent.emit(this.mealId());
  }

  /**
   *
   */
  onPickFood(foodId: string): void {
    this.pickedFoodEvent.emit({ foodId, mealId: this.mealId() });
  }
}
