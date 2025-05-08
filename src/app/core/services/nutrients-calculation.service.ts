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
          total: 0,
          animal: 0,
          plant: 0,
        },
        fats: {
          total: 0,
          saturated: 0,
          monounsaturated: 0,
          polyunsaturated: 0,
          trans: 0,
        },
        sugars: {
          total: 0,
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
          total: 0,
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
      totalNutrition.macroNutrients.protein = {
        total: Number(
          (
            totalNutrition.macroNutrients.protein.total +
            foodPosition.food.macroNutrients.protein.total * quantity
          ).toFixed(1),
        ),
        animal: Number(
          (
            totalNutrition.macroNutrients.protein.animal +
            foodPosition.food.macroNutrients.protein.animal * quantity
          ).toFixed(1),
        ),
        plant: Number(
          (
            totalNutrition.macroNutrients.protein.plant +
            foodPosition.food.macroNutrients.protein.plant * quantity
          ).toFixed(1),
        ),
      };

      totalNutrition.macroNutrients.fats = {
        total:
          totalNutrition.macroNutrients.fats.total +
          foodPosition.food.macroNutrients.fats.total * quantity,
        saturated:
          totalNutrition.macroNutrients.fats.saturated +
          foodPosition.food.macroNutrients.fats.saturated * quantity,
        monounsaturated:
          totalNutrition.macroNutrients.fats.monounsaturated +
          foodPosition.food.macroNutrients.fats.monounsaturated * quantity,
        polyunsaturated:
          totalNutrition.macroNutrients.fats.polyunsaturated +
          foodPosition.food.macroNutrients.fats.polyunsaturated * quantity,
        trans:
          totalNutrition.macroNutrients.fats.trans +
          foodPosition.food.macroNutrients.fats.trans * quantity,
      };

      totalNutrition.macroNutrients.sugars = {
        total:
          totalNutrition.macroNutrients.sugars.total +
          foodPosition.food.macroNutrients.sugars.total * quantity,
        glucose:
          totalNutrition.macroNutrients.sugars.glucose +
          foodPosition.food.macroNutrients.sugars.glucose * quantity,
        fructose:
          totalNutrition.macroNutrients.sugars.fructose +
          foodPosition.food.macroNutrients.sugars.fructose * quantity,
        sucrose:
          totalNutrition.macroNutrients.sugars.sucrose +
          foodPosition.food.macroNutrients.sugars.sucrose * quantity,
      };

      totalNutrition.macroNutrients.carbohydrates +=
        foodPosition.food.macroNutrients.carbohydrates * quantity;
      totalNutrition.macroNutrients.fiber +=
        foodPosition.food.macroNutrients.fiber * quantity;
      totalNutrition.macroNutrients.cholesterol +=
        foodPosition.food.macroNutrients.cholesterol * quantity;

      // Update vitamins
      totalNutrition.vitamins.vitamin_A = {
        total:
          totalNutrition.vitamins.vitamin_A.total +
          foodPosition.food.vitamins.vitamin_A.total * quantity,
        retinol:
          totalNutrition.vitamins.vitamin_A.retinol +
          foodPosition.food.vitamins.vitamin_A.retinol * quantity,
        beta_carotene:
          totalNutrition.vitamins.vitamin_A.beta_carotene +
          foodPosition.food.vitamins.vitamin_A.beta_carotene * quantity,
        IU_units:
          totalNutrition.vitamins.vitamin_A.IU_units +
          foodPosition.food.vitamins.vitamin_A.IU_units * quantity,
      };

      // Update simple vitamins
      totalNutrition.vitamins.vitamin_C +=
        foodPosition.food.vitamins.vitamin_C * quantity;
      totalNutrition.vitamins.vitamin_E +=
        foodPosition.food.vitamins.vitamin_E * quantity;
      totalNutrition.vitamins.vitamin_K +=
        foodPosition.food.vitamins.vitamin_K * quantity;
      totalNutrition.vitamins.B1_thiamine +=
        foodPosition.food.vitamins.B1_thiamine * quantity;
      totalNutrition.vitamins.B2_riboflavin +=
        foodPosition.food.vitamins.B2_riboflavin * quantity;
      totalNutrition.vitamins.B3_niacin +=
        foodPosition.food.vitamins.B3_niacin * quantity;
      totalNutrition.vitamins.B5_pantothenic_acid +=
        foodPosition.food.vitamins.B5_pantothenic_acid * quantity;
      totalNutrition.vitamins.B6_pyridoxine +=
        foodPosition.food.vitamins.B6_pyridoxine * quantity;
      totalNutrition.vitamins.B7_biotin +=
        foodPosition.food.vitamins.B7_biotin * quantity;
      totalNutrition.vitamins.B9_folic_acid +=
        foodPosition.food.vitamins.B9_folic_acid * quantity;
      totalNutrition.vitamins.B12_cobalamin +=
        foodPosition.food.vitamins.B12_cobalamin * quantity;
      totalNutrition.vitamins.vitamin_D +=
        foodPosition.food.vitamins.vitamin_D * quantity;

      // Update minerals
      totalNutrition.minerals.potassium +=
        foodPosition.food.minerals.potassium * quantity;
      totalNutrition.minerals.calcium +=
        foodPosition.food.minerals.calcium * quantity;
      totalNutrition.minerals.magnesium +=
        foodPosition.food.minerals.magnesium * quantity;
      totalNutrition.minerals.phosphorus +=
        foodPosition.food.minerals.phosphorus * quantity;
      totalNutrition.minerals.sodium +=
        foodPosition.food.minerals.sodium * quantity;
      totalNutrition.minerals.iron +=
        foodPosition.food.minerals.iron * quantity;
      totalNutrition.minerals.zinc +=
        foodPosition.food.minerals.zinc * quantity;
      totalNutrition.minerals.copper +=
        foodPosition.food.minerals.copper * quantity;
      totalNutrition.minerals.manganese +=
        foodPosition.food.minerals.manganese * quantity;
      totalNutrition.minerals.selenium +=
        foodPosition.food.minerals.selenium * quantity;
      totalNutrition.minerals.iodine +=
        foodPosition.food.minerals.iodine * quantity;
      totalNutrition.minerals.fluoride +=
        foodPosition.food.minerals.fluoride * quantity;
      totalNutrition.minerals.chromium +=
        foodPosition.food.minerals.chromium * quantity;
      totalNutrition.minerals.molybdenum +=
        foodPosition.food.minerals.molybdenum * quantity;

      // Update basic properties
      totalNutrition.calories += foodPosition.food.calories * quantity;
      totalNutrition.water += foodPosition.food.water * quantity;
      totalNutrition.glycemic_index +=
        foodPosition.food.glycemic_index * quantity;
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
    return totalCarbs > 0 ? totalGI / totalCarbs : 0;
  }
}
