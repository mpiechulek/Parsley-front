import { MacroNutrients, Minerals, Vitamins } from './food.model';

// Base food group interface
export interface FoodGroupBase {
  age_span: string;
  source: string;
  name: string;
  calories: number;
  water: number;
  macroNutrients: MacroNutrients;
  vitamins: Vitamins;
  minerals: Minerals;
}

// Main food variants interface
interface FoodVariants {
  infants: FoodGroupBase;
  children: FoodGroupBase;
  boys: FoodGroupBase;
  girls: FoodGroupBase;
  males: FoodGroupBase;
  females: FoodGroupBase;
  seniors: FoodGroupBase;
}

// Complete food model interface
export interface NutritionModel {
  name: string;
  variants: FoodVariants;
}

export interface NutritionResponse {
  data: NutritionModel;
  error: null;
}
