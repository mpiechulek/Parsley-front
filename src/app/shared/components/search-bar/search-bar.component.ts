import {
  Component,
  input,
  output,
  ChangeDetectionStrategy,
  AfterViewInit,
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { map, Observable, startWith } from 'rxjs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-search-bar',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatButtonModule,
    CommonModule,
  ],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBarComponent implements AfterViewInit {
  public foodControl = new FormControl<string>('');
  public filteredOptions$!: Observable<{ id: string; name: string }[]>;
  // outputs
  public chosenOption = output<string>();
  //inputs
  public buttonText = input<string>('Search');
  public inputLabelText = input<string>('Pick food');
  public inputPlaceholderText = input<string>('Food');
  public options = input<{ id: string; name: string }[]>([]);

  // ngAfterViewInit is used because ngOnInit didn't trigger at start the dropdown list
  ngAfterViewInit(): void {
    this.filteredOptions$ = this.foodControl.valueChanges.pipe(
      startWith(''),
      map((value) => this.filter(value || '')),
    );
  }

  get isFormValid(): boolean {
    return (
      this.foodControl.valid &&
      this.foodControl.value !== '' &&
      this.foodControl.value !== null &&
      this.checkIfNameIsOnList()
    );
  }

  /**
   *
   * @returns
   */
  private checkIfNameIsOnList(): boolean {
    return this.options().some(
      (option) => option.name === this.foodControl.value,
    );
  }

  /**
   * Searching the name
   * @param value
   * @returns
   */
  private filter(value: string): { id: string; name: string }[] {
    return this.options().filter((option) =>
      option.name.toLowerCase().startsWith(value.toLowerCase()),
    );
  }

  /**
   *
   */
  public getOption(): void {
    const name = this.foodControl.value;
    if (name) {
      const id = this.getIdByName(name);
      if (id) {
        this.chosenOption.emit(id);
        this.foodControl.reset();
      }
    }
  }

  /**
   * Get the id by name
   */
  private getIdByName(name: string): string | undefined {
    return this.options().find((option) => option.name === name)?.id;
  }
}
