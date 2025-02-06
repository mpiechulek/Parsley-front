import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthPageComponent } from "../../features/auth-page/auth-page.component";

@Component({
  selector: 'app-login-layout',
  templateUrl: './login-layout.component.html',
  styleUrl: './login-layout.component.scss',
  imports: [AuthPageComponent]
})
export class LoginLayoutComponent {

}
