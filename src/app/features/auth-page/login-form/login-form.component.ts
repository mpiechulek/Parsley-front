import { Component, inject, output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AuthAction, AuthFormControls } from '@models/auth-form.model';
import { AuthFormType } from '../../../core/models/auth-form.model';

@Component({
  selector: 'app-login-form',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent {
  formBuilder: FormBuilder = inject(FormBuilder);
  authForm: FormGroup<AuthFormControls> = this.initializeForm();
  pwdHide = false;
  authFormTypes: typeof AuthFormType = AuthFormType;
  authAction = output<AuthAction>();

  /**
   *
   * @returns
   */
  private initializeForm() {
    return this.formBuilder?.group<AuthFormControls>({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  get emailError(): boolean {
    return this.authForm.controls.email?.invalid || false;
  }

  get passwordError(): boolean {
    return this.authForm.controls.password?.invalid || false;
  }

  /**
   *
   */
  onLogin(): void {
    if (this.authForm.valid) {
      const formData = this.authForm.value;
      this.authAction.emit({
        type: this.authFormTypes.LOGIN,
        payload: { email: formData.email!, password: formData.password! },
      });
    }
  }
}
