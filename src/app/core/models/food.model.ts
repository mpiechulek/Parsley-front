export interface FoodModel {
  id: string;
  name: string;
  kcal: number;
  water: number;
  proteinTotal: number;
  proteinAnimal: number;
  proteinPlant: number;
  fat: number;
  carbs: number;
  cholesterol: number;
  glycemicIndex: number;
  saccharose: number;
  lactose: number;
  starch: number;
  fiber: number;
  sodium: number;
  potassium: number;
  calcium: number;
  phosphorus: number;
  magnesium: number;
  iron: number;
  zinc: number;
  copper: number;
  manganese: number;
  vitRetinolA: number;
  vitBetaKaroten: number;
  vitD: number;
  vitE: number;
  vitThiamineB1: number;
  vitRiboflavinB2: number;
  vitNiacinB3: number;
  vitB6: number;
  vitFoliansB9: number;
  vitB12: number;
  vitB7:number;
  vitC: number;
  vitK: number;
}

export interface FoodResponse {
  success: boolean;
  data: FoodModel;
  message: string;
}

