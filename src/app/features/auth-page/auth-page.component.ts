import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './login-form/login-form.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { AuthAction } from '@models/auth-form.model';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-auth-page',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    LoginFormComponent,
    SignupFormComponent,
  ],
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.scss',
})
export class AuthPageComponent {
  authService = inject(AuthService);
  chosenFormType: 'login' | 'signup' = 'login';
  error: string | null = null;

  /**
   *
   * @param type
   */
  onChoseFormType(type: 'login' | 'signup'): void {
    this.chosenFormType = type;
  }

  /**
   *
   * @param action
   */
  onAuthorize(action: AuthAction): void {
    const email = action.payload.email;
    const password = action.payload.password;
    if (email && password) {
      if (action.type === 'login') {
        console.log('Login:', action.payload);
        this.authService.loginUser(email, password);
      }
      if (action.type === 'signup') {
        console.log('Signup:', action.payload);
        if (action.payload.email)
          this.authService.signUpNewUser(email, password);
      }
    }
  }
}
