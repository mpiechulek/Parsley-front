import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment.development';
import { FoodListShortResponse, FoodResponse } from '@models/food.model';
import { NutritionResponse } from '@models/nutrition.model';
import { debounceTime, distinctUntilChanged, Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private httpClient = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  /**

   * Fetches the details of a specific food item by its ID.
   *
   * This method sends an HTTP GET request to the API endpoint to retrieve the details
   * of a food item identified by the provided `foodId`. The response is an observable
   * of type `FoodResponse`, which contains the food item details.
   *
   * The method applies the following RxJS operators to the observable stream:
   *
   * - `debounceTime(300)`: Delays the emission of the value by 300 milliseconds to prevent
   *   rapid successive requests, which is useful for scenarios like type-ahead search.
   *
   * - `distinctUntilChanged()`: Ensures that the observable emits values only when the
   *   current value is different from the last emitted value. This helps in avoiding
   *   duplicate requests for the same food ID.
   *
   * - `shareReplay({ bufferSize: 1, refCount: true })`: Shares the observable among multiple
   *   subscribers and replays the last emitted value to new subscribers. The `bufferSize: 1`
   *   ensures that only the latest value is cached, and `refCount: true` ensures that the
   *   observable is kept alive as long as there are subscribers.
   *
   * @param foodId - The unique identifier of the food item to be fetched.
   * @returns An observable of type `FoodResponse` containing the details of the food item.
   */
  getFood(foodId: string): Observable<FoodResponse> {
    return this.httpClient
      .get<FoodResponse>(`${this.apiUrl}/foods/${foodId}`)
      .pipe(debounceTime(300), distinctUntilChanged(), shareReplay({ bufferSize: 1, refCount: true }));
  }

  /**
   *
   * @returns
   */
  getFoodsShortList(): Observable<FoodListShortResponse> {
    return this.httpClient.get<FoodListShortResponse>(`${this.apiUrl}/foods/short-list`);
  }

  /**
   *
   * @returns
   */
  getNutritionData(): Observable<NutritionResponse> {
    return this.httpClient.get<NutritionResponse>(`${this.apiUrl}/nutrition`);
  }
}
