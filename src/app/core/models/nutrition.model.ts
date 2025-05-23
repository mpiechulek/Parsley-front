import { FoodModel } from './food.model';

// Base food group interface
export interface FoodGroupBase extends Omit<FoodModel, 'id' | 'glycemic_index'> {
  age_span?: string;
  source?: string;
}

// Main food variants interface
export interface FoodVariants {
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
