import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '@shared/components/header/header.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { SideNavComponent } from '@shared/components/side-nav/side-nav.component';
import { FoodStore } from '@features/food-state/food.state';
import { FoodListShortResponse } from '@models/food.model';
import { ApiService } from '@services/api.service';
@Component({
  selector: 'app-secure-layout',
  imports: [
    RouterOutlet,
    HeaderComponent,
    MatButtonModule,
    MatSidenavModule,
    SideNavComponent,
  ],
  templateUrl: './secure-layout.component.html',
  styleUrl: './secure-layout.component.scss',
})
export class SecureLayoutComponent implements OnInit {
  showFiller = false;
  foodStore = inject(FoodStore);
  apiService = inject(ApiService);

  @ViewChild('drawer') drawer: MatSidenav | undefined;

  ngOnInit(): void {
    // 1. Call the food state and check if the list is there
    if (this.foodStore.foodShortList.length === 0) {
      // 2. If the list is empty, call the getFoodsShortList method
      this.getFoodsShortList();
    }
  }

  /**
   * Showing and hiding the side nav
   */
  onToggleSideNav(): void {
    this.drawer?.toggle();
  }

  /**
   * Get food short list
   */
  getFoodsShortList(): void {
    this.apiService
      .getFoodsShortList()
      .subscribe((foodSearchList: FoodListShortResponse) => {
        this.foodStore.setFoodShortList(foodSearchList.data);
      });
  }
}
