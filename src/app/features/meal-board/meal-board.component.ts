import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MealCardComponent } from '@shared/components/meal-card/meal-card.component';
import { PageHeaderComponent } from '@shared/components/page-header/page-header.component';

@Component({
  selector: 'app-meal-board',
  imports: [
    MealCardComponent,
    PageHeaderComponent,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './meal-board.component.html',
  styleUrl: './meal-board.component.scss',
})
export class MealBoardComponent {}
