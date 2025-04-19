import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { GenderPickerComponent } from './gender-picker/gender-picker.component';
@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, GenderPickerComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {}
