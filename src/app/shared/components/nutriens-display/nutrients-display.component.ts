import { Component, input } from '@angular/core';
import { FoodModel } from '@models/food.model';

@Component({
  selector: 'app-nutrients-display',
  imports: [],
  templateUrl: './nutrients-display.component.html',
  styleUrl: './nutrients-display.component.scss',
})
export class NutrientsDisplayComponent {
  nutrientData = input<FoodModel>({} as FoodModel);
  displayName = input<boolean>(true);
}
