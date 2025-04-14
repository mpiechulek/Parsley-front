import {
  patchState,
  signalState,
  signalStore,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { FoodState } from '@models/food-state.model';
import { FoodShortModel } from '@models/food.model';

export const initialFoodState = signalState<FoodState>({
  foodShortList: [] as FoodShortModel[],
  error: null,
});

export const FoodStore = signalStore(
  { providedIn: 'root' },
  withState<FoodState>(initialFoodState),
  withDevtools('foodStore'),
  withMethods((store) => ({
    stateInit: (): void => {
      patchState(store);
    },
    clearState: (): void => {
      patchState(store, initialFoodState);
    },
    setFoodShortList(foodShortList: FoodShortModel[]): void {
      patchState(store, { foodShortList });
    },
  })),
  withHooks({
    onInit: ({ stateInit }): void => {
      stateInit();
    },
  }),
);
