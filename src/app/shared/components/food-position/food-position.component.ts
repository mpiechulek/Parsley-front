import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FoodPosition } from '@models/meal.model';
import { DeleteButtonsComponent } from '../delete-buttons/delete-buttons.component';

@Component({
  selector: 'app-food-position',
  imports: [MatIconModule, MatInputModule, DeleteButtonsComponent],
  templateUrl: './food-position.component.html',
  styleUrl: './food-position.component.scss',
})
export class FoodPositionComponent {
  foodPosition = input<FoodPosition>({} as FoodPosition);
}
