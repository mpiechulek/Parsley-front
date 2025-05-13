export interface FoodShortModel {
  id: string;
  name: string;
}

export interface FoodMealPosition {
  food: FoodModel;
  quantity: number;
  unit: string;
}
export interface FoodModel {
  id: string;
  name: string;
  calories: number;
  water: number;
  macroNutrients: MacroNutrients;
  vitamins: Vitamins;
  minerals: Minerals;
  glycemic_index: number;
}
export interface Protein {
  totalProteins: number;
  animal: number;
  plant: number;
}

export interface Fats {
  totalFats: number;
  saturated: number;
  monounsaturated: number;
  polyunsaturated: number;
  trans: number;
}

export interface Sugars {
  totalSugars: number;
  glucose: number;
  fructose: number;
  sucrose: number;
}

export interface VitaminA {
  totalVitamin_A: number;
  retinol: number;
  beta_carotene: number;
  IU_units: number;
}

export interface MacroNutrients {
  protein: Protein;
  fats: Fats;
  carbohydrates: number;
  sugars: Sugars;
  fiber: number;
  cholesterol: number;
}

export interface Vitamins {
  vitamin_C: number;
  vitamin_A: VitaminA;
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

export interface Minerals {
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

export interface FoodResponse {
  success: boolean;
  data: FoodModel;
  message: string;
}

export interface FoodShortModel {
  id: string;
  name: string;
}
export interface FoodListShortResponse {
  success: boolean;
  data: FoodShortModel[];
  message: string;
}
