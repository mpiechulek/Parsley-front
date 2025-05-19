import { ChangeDetectionStrategy, Component, input, linkedSignal, output } from '@angular/core';
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
  changeFoodQuantity = output<{ name: string; quantity: number }>();
  deleteFood = output<string>();
  foodPosition = input<FoodPosition>({} as FoodPosition);
  foodQuantity = linkedSignal<number>(() => this.foodPosition().quantity);
  //Debounce time 300ms
  foodQuery = debouncedSignal(this.foodQuantity, 300, this.foodQuantity());

  //TODO: Effect triggers 2 times on input key press
  constructor() {
    effect(() => {
      if (this.foodPosition()) this.onChangeFoodQuantity(this.foodQuery());
    });
  }

  /**
   *
   */
  onChangeFoodQuantity(foodQ: number): void {
    const position = this.foodPosition();

    // Validate inputs
    if (!position.name || isNaN(foodQ)) {
      return;
    } else {
      this.changeFoodQuantity.emit({
        name: position.name,
        quantity: Math.max(0, Number(foodQ)), // Ensure positive quantity
      });
    }
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
