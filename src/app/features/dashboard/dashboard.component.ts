import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FoodModel, FoodResponse } from '@models/food.model';
import { ApiService } from '@services/api.service';
import { GlobalStore } from 'app/state/global.state';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  apiService = inject(ApiService);
  globalStore = inject(GlobalStore);
  food = signal<FoodModel>({} as FoodModel);

  ngOnInit() {
    this.getFood();
  }

  getFood(): void {
    this.apiService.getFood('1').subscribe((food: FoodResponse) => {
      this.food.set(food.data);
    });
  }
}
