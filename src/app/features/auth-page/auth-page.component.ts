import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './login-form/login-form.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { AuthAction, AuthFormType } from '@models/auth-form.model';
import { SpinnerComponent } from '@shared/components/spinner/spinner.component';
import { GlobalStore } from 'app/state/global.state';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component, effect, inject, ChangeDetectionStrategy } from '@angular/core';

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
    SpinnerComponent,
    SignupFormComponent,
    LoginFormComponent,
  ],
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthPageComponent {
  readonly globalStore = inject(GlobalStore);
  authFormTypes: typeof AuthFormType = AuthFormType;
  selectedFormType: 'login' | 'signup' = this.authFormTypes.LOGIN;

  constructor() {
    // When the user is manages to sirup successfully, we want to show the login form
    effect(() => {
      const isSignup = this.globalStore.isSignup();
      if (isSignup) {
        this.selectedFormType = this.authFormTypes.LOGIN;
      }
    });
  }

  /**
   *
   * @param type
   */
  onChoseFormType(type: 'login' | 'signup'): void {
    this.selectedFormType = type;
  }

  /**
   *
   * @param action
   */
  onAuthorize(action: AuthAction): void {
    const email = action.payload.email;
    const password = action.payload.password;
    if (email && password) {
      if (action.type === this.authFormTypes.LOGIN) {
        this.globalStore.loginUser(email, password);
      }
      if (
        action.type === this.authFormTypes.SIGNUP &&
        action.payload.password
      ) {
        this.globalStore.signUpNewUser(email, password);
      }
    }
  }
}
