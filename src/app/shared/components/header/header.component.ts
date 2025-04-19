import { Component, inject, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { GlobalStore } from 'app/state/global.state';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  globalStore = inject(GlobalStore);
  toggleSideNav = output();

  /**
   *
   */
  onLogout(): void {
    this.globalStore.logout();
  }

  /**
   *
   */
  onToggleSideNav(): void {
    this.toggleSideNav.emit();
  }
}
