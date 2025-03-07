import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FoodModel, FoodResponse } from '@models/food.model';
import { ApiService } from '@services/api.service';
import { GlobalStore } from 'app/state/global.state';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnDestroy, OnInit {

  apiService = inject(ApiService);
  globalStore = inject(GlobalStore);

  food = signal<FoodModel>({} as FoodModel) ;

  private intervalId!: ReturnType<typeof setInterval>;
  minutes = 0;
  seconds = 0;
  isRunning = false;

  ngOnInit() {
    this.toggleTimer();
  }

  toggleTimer(): void {
    if (!this.isRunning) {
      this.intervalId = setInterval(() => {
        this.seconds++;
        if (this.seconds === 60) {
          this.minutes++;
          this.seconds = 0;
        }
      }, 1000);
    } else {
      clearInterval(this.intervalId);
    }
    this.isRunning = !this.isRunning;
  }

  resetTimer(): void {
    clearInterval(this.intervalId);
    this.minutes = 0;
    this.seconds = 0;
    this.isRunning = false;
  }

  getFood(): void {
    this.apiService.getFood('1').subscribe((food: FoodResponse) => {
      this.food.set(food.data);
    });
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

}
