import { CommonModule, DecimalPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { FoodModel } from '@models/food.model';
import { NutrientPercentagePipe } from '../../pipes/nutriens-percentage.pipe';
import { FoodGroupBase } from '@models/nutrition.model';

@Component({
  selector: 'app-nutrients-display',
  imports: [DecimalPipe, NutrientPercentagePipe, CommonModule],
  templateUrl: './nutrients-display.component.html',
  styleUrl: './nutrients-display.component.scss',
})
export class NutrientsDisplayComponent {
  nutrientData = input<FoodModel | FoodGroupBase>({} as FoodModel);
  displayName = input<boolean>(true);

  get isObjectNotEmpty(): boolean {
    return !!Object.keys(this.nutrientData()).length;
  }
}
