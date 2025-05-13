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
import { effect } from '@angular/core';
import { debouncedSignal } from '@shared/utils/debounce-time-signal';

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
  //Debounce time 300ms
  foodQuery = debouncedSignal(this.foodQuantity, 300, 100);

  //TODO: Effect triggers 2 times on input key press
  constructor() {
    effect(() => {
      this.onChangeFoodQuantity(this.foodQuery());
    });
  }

  /**
   *
   */
  onChangeFoodQuantity(foodQ: number): void {
    const position = this.foodPosition();

    // Validate inputs
    if (!position.name || isNaN(foodQ)) {
      throw new Error('Invalid food position or quantity');
    }

    this.changeFoodQuantity.emit({
      name: position.name,
      quantity: Math.max(0, Number(foodQ)), // Ensure positive quantity
    });
  }

  /**
   *
   */
  onDeleteFoodPosition(): void {
    const position = this.foodPosition();
    if (!position.name) {
      throw new Error('Cannot delete food position without a name');
    }
    this.deleteFood.emit(position.name);
  }
}
