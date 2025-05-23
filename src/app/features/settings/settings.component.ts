import { Component, inject, linkedSignal } from '@angular/core';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { PageHeaderComponent } from '@shared/components/page-header/page-header.component';
import { FoodStore } from 'app/state/food.state';
import { NutrientsDisplayComponent } from '@shared/components/nutriens-display/nutrients-display.component';
import { FoodGroupBase, FoodVariants } from '@models/nutrition.model';

@Component({
  selector: 'app-settings',
  imports: [MatRadioModule, FormsModule, PageHeaderComponent, NutrientsDisplayComponent],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent {
  public foodStore = inject(FoodStore);
  public chosenVariant: string | null = this.foodStore.userVariantName ? this.foodStore.userVariantName() : null;
  readonly variants = linkedSignal(() => {
    const dailyGroups = this.foodStore.dailyNutritionGroups();
    console.log(dailyGroups.variants.boys);
    return dailyGroups ? Object.keys(dailyGroups.variants) : [];
  });

  /**
   *
   * @param variant
   */
  public onVariantChange(variant: string): void {
    this.foodStore.onChangePersonProfileVariant(variant);
  }

  /**
   *
   */
  get userVariant(): FoodGroupBase {
    const dailyGroups = this.foodStore.dailyNutritionGroups();
    return this.chosenVariant ? dailyGroups.variants[this.chosenVariant as keyof FoodVariants] : ({} as FoodGroupBase);
  }
}
