import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import {
  FoodListShortResponse,
  FoodModel,
  FoodResponse,
  FoodShortModel,
} from '@models/food.model';
import { ApiService } from '@services/api.service';
import { FoodStore } from '../food-state/food.state';
import { httpResource } from '@angular/common/http';
import { SearchBarComponent } from '@shared/components/search-bar/search-bar.component';
import { NutrientsDisplayComponent } from '@shared/components/nutriens-display/nutrients-display.component';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';

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
export class FoodSearchComponent implements OnInit {
  apiService = inject(ApiService);
  foodStore = inject(FoodStore);
  foodData = signal<FoodModel>({} as FoodModel);
  foodSearchList = signal<FoodShortModel[]>([] as FoodShortModel[]);

  ngOnInit(): void {
    //TODO: Move to secure layout
    // 1. Call the food state and check if the list is there
    if (this.foodStore.foodShortList.length === 0) {
      // 2. If the list is empty, call the getFoodsShortList method
      this.getFoodsShortList();
      this.foodSearchList.set(this.foodStore.foodShortList());
    }
  }

  //TODO: Refactor to service call
  readonly postsResource = httpResource<unknown>(
    {
      url: 'http://localhost:3000/api/v1/nutrition',
      method: 'GET',
    },
    {
      // Optional configuration
      defaultValue: [],
    },
  );

  /**
   * Get food details
   */
  getFood(id: string): void {
    this.apiService.getFood(id).subscribe((food: FoodResponse) => {
      this.foodData.set(food.data);
    });
  }

  //TODO: Move call to secure layout
  /**
   * Get food short list
   */
  getFoodsShortList(): void {
    this.apiService
      .getFoodsShortList()
      .subscribe((foodSearchList: FoodListShortResponse) => {
        this.foodSearchList.set(foodSearchList.data);
        this.foodStore.setFoodShortList(foodSearchList.data);
      });
  }
}
