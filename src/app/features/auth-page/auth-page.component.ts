import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

type ToFormGroup<T> = {
  [P in keyof T]: FormControl<T[P]>;
};

interface LoginForm {
  email: string | null;
  password: string | null;
}
interface SignupForm {
  email: string | null;
  password: string | null;
  confirmPassword: string | null;
}

enum AuthFormType {
  LOGIN = 'login',
  SIGNUP = 'signup',
}

export type LoginFormControls = ToFormGroup<LoginForm>;
export type SignupFormControls = ToFormGroup<SignupForm>;

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
  ],
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.scss',
})
export class AuthPageComponent {
  formBuilder: FormBuilder = inject(FormBuilder);
  authForm: FormGroup<LoginFormControls> | FormGroup<SignupFormControls> =
    this.initializeForm();
  pwdHide: boolean = false;
  chosenFormType: 'login' | 'signup' = 'login';

  private passwordPattern =
    '(?=\\D*\\d)(?=[^a-z]*[a-z])(?=.*[#$@$!%*?&])(?=[^A-Z]*[A-Z]).{8,30}';

  /**
   *
   * @returns
   */
  private initializeForm() {
    if (this.chosenFormType === 'login') {
      return this.formBuilder?.group<LoginFormControls>({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required]),
      });
    } else {
      return this.formBuilder?.group<SignupFormControls>({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
          Validators.required,
          Validators.pattern(this.passwordPattern),
        ]),
        confirmPassword: new FormControl('', [
          Validators.required,
          Validators.pattern(this.passwordPattern)
        ]),
      });
    }
  }

  private get loginEmailFormControl(): FormControl<string | null> {
    return this.authForm.controls.email;
  }

  public get loginEmailError(): boolean {
    return this.loginEmailFormControl.errors?.['required'];
  }

  private get loginPasswordFormControl(): FormControl<string | null> {
    return this.authForm.controls.password;
  }

  public get loginPasswordError(): boolean {
    return this.loginPasswordFormControl.errors?.['required'];
  }

  // /**
  //  *
  //  * @param control
  //  * @returns
  //  */
  // matchPassword(control: FormControl): { [key: string]: boolean } | null {
  //   if (this.chosenFormType !== 'signup') return null;
  //   const password = this.authForm.controls.password.value;
  //   const confirmPassword = control.value;
  //   return password === confirmPassword ? null : { passwordMismatch: true };
  // }

  /**
   *
   */
  onLogin(): void {
    if (this.authForm.valid) {
      const formData = this.authForm.value;
      console.log(formData);
    }
  }
}
