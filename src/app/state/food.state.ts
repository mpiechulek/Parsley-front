import { patchState, signalState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals';
import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { FoodState } from '@models/food-state.model';
import { FoodListShortResponse, FoodShortModel } from '@models/food.model';
import { DailyMealsModel } from '@models/meal.model';
import { FoodGroupBase, NutritionModel, NutritionResponse } from '@models/nutrition.model';
import { ApiService } from '@services/api.service';
import { inject } from '@angular/core';

export const initialFoodState = signalState<FoodState>({
  foodShortList: [] as FoodShortModel[],
  dailyMeals: {} as DailyMealsModel,
  dailyNutrition: {} as FoodGroupBase,
  dailyNutritionGroups: {} as NutritionModel,
  userVariantObject: {} as FoodGroupBase,
  userVariantName: null,
  error: null,
});

export const FoodStore = signalStore(
  { providedIn: 'root' },
  withState<FoodState>(initialFoodState),
  withDevtools('foodStore'),
  withMethods((store, apiService = inject(ApiService)) => ({
    stateInit: (): void => {
      patchState(store);
    },
    saveDailyMeals: (dailyMeals: DailyMealsModel): void => {
      patchState(store, { dailyMeals });
      // api call
    },
    getNutritionData: (): void => {
      const key = 'dailyNutritionGroups';
      //check if nutrition lis in localstorage
      const stringValue = localStorage.getItem(key);
      const jasonValue = stringValue ? JSON.parse(stringValue) : null;
      if (!jasonValue) {
        apiService.getNutritionData().subscribe({
          next: (dailyNutritionGroupsRes: NutritionResponse) => {
            const response = dailyNutritionGroupsRes.data;
            // update state
            patchState(store, { dailyNutritionGroups: response });
            // update localstorage
            localStorage.setItem(key, JSON.stringify(response));
          },
        });
      } else {
        patchState(store, { dailyNutritionGroups: jasonValue[0] });
      }
    },
    getFoodsShortList: (): void => {
      apiService.getFoodsShortList().subscribe({
        next: (foodSearchList: FoodListShortResponse) => {
          patchState(store, { foodShortList: foodSearchList.data });
        },
      });
    },
    onChangePersonProfileVariant: (variantName: string): void => {
      localStorage.setItem('userVariant', variantName);
      patchState(store, { userVariantName: variantName });
    },
    getVariantFromStorage: (): void => {
      const variantName = localStorage.getItem('userVariant');
      if (variantName) {
        patchState(store, { userVariantName: variantName });
        // patchState(store, {
        //   userVariantObject: store.dailyNutritionGroups().variants[variantName as keyof FoodVariants],
        // });
      }
    },
    clearState: (): void => {
      patchState(store, initialFoodState);
    },
    setFoodShortList(foodShortList: FoodShortModel[]): void {
      patchState(store, { foodShortList });
    },
  })),
  withHooks({
    onInit: ({ stateInit, getVariantFromStorage }): void => {
      stateInit();
      getVariantFromStorage();
    },
    onDestroy: ({ clearState }): void => {
      clearState();
    },
  }),
);
