import { ChangeDetectionStrategy, Component, input } from '@angular/core';
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
  /**
   *
   */
  onDelete(): void {
    console.log('Delete button clicked');
  }
}
