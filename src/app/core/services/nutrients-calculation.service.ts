import { Injectable } from '@angular/core';
import { FoodMealPosition, FoodModel } from '@models/food.model';
import { MealModel } from '@models/meal.model';

@Injectable({
  providedIn: 'root',
})
export class NutrientsCalculationService {
  /**
   *
   * @param foodList
   */
  recalculateMealNutrients(meal: MealModel): FoodModel {
    const totalNutrition = {
      id: 'none',
      name: '',
      macroNutrients: {
        protein: {
          totalProteins: 0,
          animal: 0,
          plant: 0,
        },
        fats: {
          totalFats: 0,
          saturated: 0,
          monounsaturated: 0,
          polyunsaturated: 0,
          trans: 0,
        },
        sugars: {
          totalSugars: 0,
          glucose: 0,
          fructose: 0,
          sucrose: 0,
        },
        carbohydrates: 0,
        fiber: 0,
        cholesterol: 0,
      },
      vitamins: {
        vitamin_A: {
          totalVitamin_A: 0,
          retinol: 0,
          beta_carotene: 0,
          IU_units: 0,
        },
        vitamin_C: 0,
        vitamin_E: 0,
        vitamin_K: 0,
        B1_thiamine: 0,
        B2_riboflavin: 0,
        B3_niacin: 0,
        B5_pantothenic_acid: 0,
        B6_pyridoxine: 0,
        B7_biotin: 0,
        B9_folic_acid: 0,
        B12_cobalamin: 0,
        vitamin_D: 0,
      },
      minerals: {
        potassium: 0,
        calcium: 0,
        magnesium: 0,
        phosphorus: 0,
        sodium: 0,
        iron: 0,
        zinc: 0,
        copper: 0,
        manganese: 0,
        selenium: 0,
        iodine: 0,
        fluoride: 0,
        chromium: 0,
        molybdenum: 0,
      },
      calories: 0,
      water: 0,
      glycemic_index: 0,
    };
    // const glycemiaIndex = 0;

    // Process each ingredient in the meal
    meal.ingredients.forEach((foodPosition: FoodMealPosition) => {
      const roundedQuantity = Math.round(foodPosition.quantity);
      const quantity = roundedQuantity / 100;

      // Update macro nutrients
      for (const key of Object.keys(
        totalNutrition.macroNutrients.protein,
      ) as (keyof typeof totalNutrition.macroNutrients.protein)[]) {
        totalNutrition.macroNutrients.protein[key] += foodPosition.food.macroNutrients.protein[key] * quantity;
        totalNutrition.macroNutrients.protein[key] = Number(totalNutrition.macroNutrients.protein[key].toFixed(1));
      }

      // fats
      for (const key of Object.keys(
        totalNutrition.macroNutrients.fats,
      ) as (keyof typeof totalNutrition.macroNutrients.fats)[]) {
        totalNutrition.macroNutrients.fats[key] += foodPosition.food.macroNutrients.fats[key] * quantity;
        totalNutrition.macroNutrients.fats[key] = Number(totalNutrition.macroNutrients.fats[key].toFixed(1));
      }

      // sugars
      for (const key of Object.keys(
        totalNutrition.macroNutrients.sugars,
      ) as (keyof typeof totalNutrition.macroNutrients.sugars)[]) {
        totalNutrition.macroNutrients.sugars[key] += foodPosition.food.macroNutrients.sugars[key] * quantity;
        totalNutrition.macroNutrients.sugars[key] = Number(totalNutrition.macroNutrients.sugars[key].toFixed(1));
      }

      totalNutrition.macroNutrients.carbohydrates += foodPosition.food.macroNutrients.carbohydrates * quantity;
      totalNutrition.macroNutrients.fiber += foodPosition.food.macroNutrients.fiber * quantity;
      totalNutrition.macroNutrients.cholesterol += foodPosition.food.macroNutrients.cholesterol * quantity;

      // Update vitamins
      for (const key of Object.keys(
        totalNutrition.vitamins.vitamin_A,
      ) as (keyof typeof totalNutrition.vitamins.vitamin_A)[]) {
        totalNutrition.vitamins.vitamin_A[key] += foodPosition.food.vitamins.vitamin_A[key] * quantity;
        totalNutrition.vitamins.vitamin_A[key] = Number(totalNutrition.vitamins.vitamin_A[key].toFixed(4));
      }

      for (const key of Object.keys(totalNutrition.vitamins) as (keyof typeof totalNutrition.vitamins)[]) {
        if (key !== 'vitamin_A') {
          totalNutrition.vitamins[key] += foodPosition.food.vitamins[key] * quantity;
          totalNutrition.vitamins[key] = Number(totalNutrition.vitamins[key].toFixed(4));
        }
      }

      // Update minerals
      for (const key of Object.keys(totalNutrition.minerals) as (keyof typeof totalNutrition.minerals)[]) {
        totalNutrition.minerals[key] += foodPosition.food.minerals[key] * quantity;
        totalNutrition.minerals[key] = Number(totalNutrition.minerals[key].toFixed(2));
      }

      // Update basic properties
      totalNutrition.calories += foodPosition.food.calories * quantity;
      totalNutrition.water += foodPosition.food.water * quantity;
      totalNutrition.glycemic_index += foodPosition.food.glycemic_index * quantity;
    });

    totalNutrition.glycemic_index = this.calculateMealGI(meal);

    return totalNutrition;
  }

  /**
   *
   * @param meal
   * @returns
   */
  calculateMealGI(meal: MealModel): number {
    let totalCarbs = 0;
    let totalGI = 0;

    // Calculate for each ingredient
    meal.ingredients.forEach((ingredient) => {
      const quantity = ingredient.quantity / 100; // Convert to 100g portions
      const carbs = ingredient.food.macroNutrients.carbohydrates * quantity;
      const gi = ingredient.food.glycemic_index;

      totalCarbs += carbs;
      totalGI += gi * carbs;
    });

    // Calculate final GI
    return totalCarbs > 0 ? Number((totalGI / totalCarbs).toFixed(1)) : 0;
  }
}
