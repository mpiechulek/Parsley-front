import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment.development';
import { FoodResponse } from '@models/food.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private httpClient = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  /**
   *
   * @param foodId
   * @returns
   */
  getFood(foodId:string):Observable<FoodResponse> {
    return this.httpClient.get<FoodResponse>(`${this.apiUrl}/foods/${foodId}`);
  }


}
