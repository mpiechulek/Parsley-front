import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "@shared/components/header/header.component";

@Component({
  selector: 'app-secure-layout',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './secure-layout.component.html',
  styleUrl: './secure-layout.component.scss'
})
export class SecureLayoutComponent {

}
