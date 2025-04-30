import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { NutrientsDisplayComponent } from '../nutriens-display/nutrients-display.component';
import { FoodModel } from '@models/food.model';
import { DeleteButtonsComponent } from '../delete-buttons/delete-buttons.component';
import { FoodPositionComponent } from '../food-position/food-position.component';
import { FoodPosition } from '@models/meal.model';
import { DatePipe } from '@angular/common';

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
  isExpanded = input<boolean>(true);
  nutrientData = input<FoodModel>({} as FoodModel);
  selectedFoods = input<FoodPosition[]>([
    {
      name: 'Carrot',
      quantity: 100,
      unit: 'grams',
    },
  ] as FoodPosition[]);
}
