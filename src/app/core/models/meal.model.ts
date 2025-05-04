import { FoodMealPosition, FoodModel } from './food.model';
import { FoodNutritionGroupBase } from './nutrition.model';

export interface FoodPosition {
  name: string;
  quantity: number;
  unit: string;
}
export interface IngredientModel {
  amount: number;
  food: FoodModel;
  unit: string;
}

export interface MealModel {
  name: string;
  date: Date;
  id: string;
  ingredients: FoodMealPosition[];
  mealNutritious: FoodModel;
}

export interface DailyMealsModel {
  date: Date;
  meals: MealModel[];
  totalDailyMealNutritious: FoodNutritionGroupBase;
}
