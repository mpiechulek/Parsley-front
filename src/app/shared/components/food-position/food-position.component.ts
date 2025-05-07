import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  signal,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FoodPosition } from '@models/meal.model';
import { DeleteButtonsComponent } from '../delete-buttons/delete-buttons.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-food-position',
  imports: [MatIconModule, MatInputModule, DeleteButtonsComponent, FormsModule],
  templateUrl: './food-position.component.html',
  styleUrl: './food-position.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoodPositionComponent {
  foodPosition = input<FoodPosition>({} as FoodPosition);
  changeFoodQuantity = output<{ name: string; quantity: number }>();
  deleteFood = output<string>();
  foodQuantity = signal<number>(100);

  /**
   *
   */
  onChangeFoodQuantity(): void {
    this.changeFoodQuantity.emit({
      name: this.foodPosition.name,
      quantity: this.foodQuantity(),
    });
  }

  /**
   *
   */
  onDeleteFoodPosition(): void {
    this.deleteFood.emit(this.foodPosition().name);
  }
}
