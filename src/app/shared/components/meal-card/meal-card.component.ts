import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { NutrientsDisplayComponent } from '../nutriens-display/nutrients-display.component';
import { FoodModel } from '@models/food.model';

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
  ],
  templateUrl: './meal-card.component.html',
  styleUrl: './meal-card.component.scss',
})
export class MealCardComponent {
  title = input<string>('New Meal');
  nutrientData = input<FoodModel>({} as FoodModel);
}
