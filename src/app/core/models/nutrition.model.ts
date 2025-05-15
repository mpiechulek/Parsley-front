import { MacroNutrients, Minerals, Vitamins } from './food.model';

// Base food group interface
export interface FoodNutritionGroupBase {
  age_span?: string;
  calories: number;
  water: number;
  macroNutrients: MacroNutrients;
  vitamins: Vitamins;
  minerals: Minerals;
}

// Gender-specific adult nutrition interface

interface AdultsNutrition {
  age_span: string;
  gender_groups: {
    male: FoodNutritionGroupBase;
    female: FoodNutritionGroupBase;
  };
}

// Main food variants interface
interface FoodVariants {
  infants: FoodNutritionGroupBase;
  children: FoodNutritionGroupBase;
  adults: AdultsNutrition;
  seniors: FoodNutritionGroupBase;
}

// Complete food model interface
export interface NutritionModel {
  name: string;
  variants: FoodVariants;
}
