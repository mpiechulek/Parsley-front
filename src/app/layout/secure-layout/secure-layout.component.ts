import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '@shared/components/header/header.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-secure-layout',
  imports: [RouterOutlet, HeaderComponent, MatButtonModule, MatSidenavModule],
  templateUrl: './secure-layout.component.html',
  styleUrl: './secure-layout.component.scss',
})
export class SecureLayoutComponent {
  showFiller = false;
  @ViewChild('drawer') drawer: MatSidenav | undefined;

  /**
   * Showing and hiding the side nav
   */
  onToggleSideNav(): void {
    this.drawer?.toggle();
  }
}
