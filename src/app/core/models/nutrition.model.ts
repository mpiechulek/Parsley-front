// Base interfaces for common structures
interface MacronutrientBase {
  total: number;
  animal: number;
  plant: number;
}

interface VitaminABase {
  total: number;
  beta_carotene: number;
  IU_units: number;
}

interface Fats {
  total: number;
  saturated: number;
  monounsaturated: number;
  polyunsaturated: number;
  trans: number;
}

// Detailed component interfaces
interface Sugars {
  glucose: number;
  fructose: number;
}
interface Carbohydrates {
  total: number;
  sugars: Sugars;
}

interface Macronutrients {
  protein: MacronutrientBase;
  fats: Fats;
  carbohydrates: Carbohydrates;
  fiber: number;
  cholesterol: number;
}

// Vitamin interfaces
interface Vitamins {
  vitamin_C: number;
  vitamin_A?: VitaminABase;
  vitamin_E: number;
  vitamin_K: number;
  B1_thiamine: number;
  B2_riboflavin: number;
  B3_niacin: number;
  B5_pantothenic_acid: number;
  B6_pyridoxine: number;
  B7_biotin: number;
  B9_folic_acid: number;
  B12_cobalamin: number;
  vitamin_D: number;
}

// Mineral interface
interface Minerals {
  potassium: number;
  calcium: number;
  magnesium: number;
  phosphorus: number;
  sodium: number;
  iron: number;
  zinc: number;
  copper: number;
  manganese: number;
  selenium: number;
  iodine: number;
  fluoride: number;
  chromium: number;
  molybdenum: number;
}

// Base food group interface
export interface FoodNutritionGroupBase {
  age_span?: string;
  calories: number;
  water: number;
  macronutrients: Macronutrients;
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
