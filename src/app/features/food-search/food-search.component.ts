import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FoodModel, FoodResponse } from '@models/food.model';
import { ApiService } from '@services/api.service';
import { SearchBarComponent } from '@shared/components/search-bar/search-bar.component';
import { NutrientsDisplayComponent } from '@shared/components/nutriens-display/nutrients-display.component';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { FoodStore } from '@features/food-state/food.state';

@Component({
  selector: 'app-food-search',
  imports: [
    CommonModule,
    SearchBarComponent,
    NutrientsDisplayComponent,
    PageHeaderComponent,
  ],
  templateUrl: './food-search.component.html',
  styleUrl: './food-search.component.scss',
})

export class FoodSearchComponent {
  apiService = inject(ApiService);
  foodData = signal<FoodModel>({} as FoodModel);
  foodStore = inject(FoodStore);

  //TODO: Refactor to service call
  // readonly postsResource = httpResource<unknown>(
  //   {
  //     url: 'http://localhost:3000/api/v1/nutrition',
  //     method: 'GET',
  //   },
  //   {
  //     // Optional configuration
  //     defaultValue: [],
  //   },
  // );

  /**
   * Get food details
   */
  getFood(id: string): void {
    this.apiService.getFood(id).subscribe((food: FoodResponse) => {
      this.foodData.set(food.data);
    });
  }
}
