import { HttpErrorResponse } from '@angular/common/http';
import { FoodShortModel } from './food.model';
import { DailyMealsModel } from './meal.model';

export interface FoodState {
  foodShortList: FoodShortModel[];
  dailyMeals: DailyMealsModel;
  error: HttpErrorResponse | null;
}
