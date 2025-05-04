import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-delete-buttons',
  imports: [MatIconModule, MatButtonModule, MatTooltipModule],
  templateUrl: './delete-buttons.component.html',
  styleUrl: './delete-buttons.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteButtonsComponent {
  buttonStyle = input<'icon' | 'text-icon'>('icon');
  deleteEvent = output();

  /**
   *
   */
  onDelete(): void {
    this.deleteEvent.emit();
  }
}
