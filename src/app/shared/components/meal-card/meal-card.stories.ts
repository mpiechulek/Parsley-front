// src/app/components/button/button.stories.ts
import { Meta } from '@storybook/angular';
import { MealCardComponent } from './meal-card.component';
import { EmptyNutrients } from 'app/data/constants/empty-nutrients';

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
    displayName: false,
    selectedFoods: [
      {
        name: 'Carrot',
        quantity: 100,
        unit: 'grams',
      },
      {
        name: 'Apple',
        quantity: 200,
        unit: 'grams',
      },
      {
        name: 'Milk',
        quantity: 250,
        unit: 'ml',
      },
    ],
    nutrientData: EmptyNutrients,
  },
};
