// src/app/components/button/button.stories.ts
import { Meta } from '@storybook/angular';
import { FoodPositionComponent } from './food-position.component';

export default {
  title: 'Components/Food-Position-Component',
  component: FoodPositionComponent,
} as Meta;

export const Closed = {
  args: {
    foodPosition: {
      name: 'Watermelon',
      quantity: 300,
      unit: 'g',
    },
    foodQuantity: 100,
  },
};
