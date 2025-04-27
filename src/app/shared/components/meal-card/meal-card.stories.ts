// src/app/components/button/button.stories.ts
import { Meta } from '@storybook/angular';
import { MealCardComponent } from './meal-card.component';

export default {
  title: 'Components/Meal-card',
  component: MealCardComponent,
  argTypes: {
    variant: {
      control: { type: 'inline-radio', options: ['primary', 'secondary'] },
    },
    label: { control: 'text' },
  },
} as Meta;

export const Closed = {
  args: {
    variant: 'closed',
    title: '1 Breakfast',
    nutrientData: {
      macroNutrients: {
        protein: {
          total: 0.94,
          animal: 0,
          plant: 0.94,
        },
        fats: {
          total: 0.12,
          saturated: 0.015,
          monounsaturated: 0.023,
          polyunsaturated: 0.025,
          trans: 0,
        },
        sugars: {
          total: 9.35,
          glucose: 2.5,
          fructose: 2.4,
          sucrose: 4.2,
        },
        carbohydrates: 11.75,
        fiber: 2.4,
        cholesterol: 0,
      },
      vitamins: {
        vitamin_A: {
          total: 0.011,
          retinol: 0,
          beta_carotene: 0.071,
          IU_units: 38,
        },
        vitamin_C: 53.2,
        vitamin_E: 0.18,
        vitamin_K: 0,
        B1_thiamine: 0.087,
        B2_riboflavin: 0.04,
        B3_niacin: 0.282,
        B5_pantothenic_acid: 0.25,
        B6_pyridoxine: 0.06,
        B7_biotin: 0,
        B9_folic_acid: 0.03,
        B12_cobalamin: 0,
        vitamin_D: 0,
      },
      minerals: {
        potassium: 181,
        calcium: 40,
        magnesium: 10,
        phosphorus: 14,
        sodium: 0,
        iron: 0.1,
        zinc: 0.07,
        copper: 0.045,
        manganese: 0.025,
        selenium: 0.0005,
        iodine: 0,
        fluoride: 0,
        chromium: 0,
        molybdenum: 0,
      },
      _id: '67d69b62682aa7c8e8991a19',
      id: '1dba655d-92d5-43c2-ba42-84045603fc2e',
      name: 'Orange',
      calories: 47,
      water: 86.75,
      glycemic_index: 43,
    },
  },
};
