import { Component, inject, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { NutrientsDisplayComponent } from '../nutriens-display/nutrients-display.component';
import { FoodMealPosition, FoodModel, FoodShortModel } from '@models/food.model';
import { DeleteButtonsComponent } from '../delete-buttons/delete-buttons.component';
import { FoodPositionComponent } from '../food-position/food-position.component';
import { DatePipe } from '@angular/common';
import { EmptyNutrients } from 'app/data/constants/empty-nutrients';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-meal-card',
  imports: [
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    SearchBarComponent,
    NutrientsDisplayComponent,
    DeleteButtonsComponent,
    FoodPositionComponent,
    DatePipe,
  ],
  templateUrl: './meal-card.component.html',
  styleUrl: './meal-card.component.scss',
})
export class MealCardComponent {
  readonly dialog = inject(MatDialog);

  displayName = false;
  currentDate = new Date();
  notSavedChanges = false;

  title = input<string>('New Meal');
  isExpanded = input<boolean>(false);
  nutrientData = input<FoodModel>(EmptyNutrients as FoodModel);
  selectedFoods = input<FoodMealPosition[]>([] as FoodMealPosition[]);
  mealId = input<string>('');
  foodSearchList = input<FoodShortModel[]>([] as FoodShortModel[]);

  deleteMealEvent = output<string>();
  deleteFoodFromMeal = output<{ name: string; mealId: string }>();
  updateMealFoodQuantity = output<{
    name: string;
    mealId: string;
    quantity: number;
  }>();
  pickedFoodEvent = output<{ foodId: string; mealId: string }>({});
  saveMeal = output();

  /**
   *
   */
  onDeleteMeal(): void {
    this.deleteMealEvent.emit(this.mealId());
  }

  /**
   *
   */
  onPickFood(foodId: string): void {
    this.pickedFoodEvent.emit({ foodId, mealId: this.mealId() });
    this.notSavedChanges = true;
  }

  /**
   *
   */
  onSaveMeal(): void {
    this.saveMeal.emit();
    this.notSavedChanges = false;
  }

  /**
   *
   */
  openDialog(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        confirmButtonName: 'Yes',
        cancelButtonName: 'No',
        message: 'Are you sure you want to delete this meal?',
      },
      width: '350px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.onDeleteMeal();
    });
  }

  /**
   *
   * @param param0
   */
  onChangeFoodQuantity(foodData: { name: string; quantity: number }) {
    this.updateMealFoodQuantity.emit({
      name: foodData.name,
      mealId: this.mealId(),
      quantity: foodData.quantity,
    });
    this.notSavedChanges = true;
  }

  /**
   *
   * @param name
   */
  onDeleteFoodPosition(name: string): void {
    this.deleteFoodFromMeal.emit({ name, mealId: this.mealId() });
    this.notSavedChanges = true;
  }
}
