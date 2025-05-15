import { Pipe, PipeTransform } from '@angular/core';
import { FoodNutritionGroupBase } from '@models/nutrition.model';
import { exampleDailyNutrients } from '@data/constants/example-daily-nutrients';

@Pipe({
  name: 'nutrientPercentage',
  pure: true,
  standalone: true,
})
export class NutrientPercentagePipe implements PipeTransform {
  transform(nutrientValue: number, nutrientKeyName: string): number | null {
    if (nutrientValue === 0) return 0;
    const value = this.recursiveSearch(exampleDailyNutrients, nutrientKeyName);

    if (!!value && typeof value === 'number') {
      if (value === 0) return 0;
      return Number(((nutrientValue * 100) / value).toFixed(0));
    }

    return null;
  }

  /**
   *
   */
  recursiveSearch(
    obj: FoodNutritionGroupBase,
    targetKey: string,
  ): undefined | null | number | object {
    for (const [currentKey, value] of Object.entries(obj)) {
      // If we found the key and it's not an object, return the value
      if (currentKey === targetKey && typeof value !== 'object') {
        return value;
      }
      // If the value is an object, recursively search it
      else if (typeof value === 'object') {
        const result = this.recursiveSearch(value, targetKey);
        if (result !== undefined) return result;
      }
    }
    return undefined;
  }
}
