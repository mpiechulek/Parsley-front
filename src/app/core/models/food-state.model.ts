import { HttpErrorResponse } from '@angular/common/http';
import { FoodShortModel } from './food.model';
import { DailyMealsModel } from './meal.model';
import { FoodGroupBase, NutritionModel } from './nutrition.model';

export interface FoodState {
  foodShortList: FoodShortModel[];
  dailyMeals: DailyMealsModel;
  dailyNutrition: FoodGroupBase;
  dailyNutritionGroups: NutritionModel;
  userVariantObject: FoodGroupBase;
  userVariantName: string | null;
  error: HttpErrorResponse | null;
}
