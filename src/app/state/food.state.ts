import { patchState, signalState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals';
import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { FoodState } from '@models/food-state.model';
import { FoodShortModel } from '@models/food.model';
import { DailyMealsModel } from '@models/meal.model';

export const initialFoodState = signalState<FoodState>({
  foodShortList: [] as FoodShortModel[],
  dailyMeals: {} as DailyMealsModel,
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
    saveDailyMeals: (dailyMeals: DailyMealsModel): void => {
      patchState(store, { dailyMeals });
      // api call
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
