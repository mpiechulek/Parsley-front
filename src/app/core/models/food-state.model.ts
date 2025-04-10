import { HttpErrorResponse } from '@angular/common/http';
import { FoodShortModel } from './food.model';

export interface FoodState {
  foodShortList: FoodShortModel[];
  error: HttpErrorResponse | null;
}
