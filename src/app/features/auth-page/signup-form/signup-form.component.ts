import { Component, inject, output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {
  AuthAction,
  AuthFormControls,
  AuthFormType,
} from '@models/auth-form.model';

@Component({
  selector: 'app-signup-form',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './signup-form.component.html',
  styleUrl: './signup-form.component.scss',
})
export class SignupFormComponent {
  private passwordPattern =
    '(?=\\D*\\d)(?=[^a-z]*[a-z])(?=.*[#$@$!%*?&])(?=[^A-Z]*[A-Z]).{8,30}';
  private emailPattern = '^[a-zA-Z0-9_.±]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$';
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
    return this.formBuilder.group<AuthFormControls>(
      {
        email: new FormControl('', [
          Validators.required,
          Validators.pattern(this.emailPattern),
        ]),
        password: new FormControl('', [
          Validators.required,
          Validators.pattern(this.passwordPattern),
        ]),
        confirmPassword: new FormControl('', [
          Validators.required,
          Validators.pattern(this.passwordPattern),
        ]),
      },
      {
        validators: this.checkIfMatchingPasswords(
          'password',
          'confirmPassword',
        ),
      },
    );
  }

  get emailError(): boolean {
    return this.authForm.controls.email?.invalid || false;
  }

  get passwordError(): boolean {
    return this.authForm.controls.password?.invalid || false;
  }

  get confirmPasswordError(): boolean {
    return this.authForm.controls.confirmPassword?.invalid || false;
  }

  /**
   *
   */
  private checkIfMatchingPasswords(
    passwordKey: string,
    passwordConfirmationKey: string,
  ): ValidatorFn {
    return (control: AbstractControl): Record<string, boolean> | null => {
      const formGroup = control as FormGroup;
      if (!formGroup) {
        return { notEquivalent: true };
      }

      const passwordInput = formGroup.controls[passwordKey];
      const passwordConfirmationInput =
        formGroup.controls[passwordConfirmationKey];

      if (passwordInput.value !== passwordConfirmationInput.value) {
        passwordConfirmationInput.setErrors({ notEquivalent: true });
        return { notEquivalent: true };
      } else {
        passwordConfirmationInput.setErrors(null);
        return null;
      }
    };
  }

  /**
   *
   */
  onSignUp(): void {
    if (this.authForm.valid) {
      const formData = this.authForm.value;
      this.authAction.emit({
        type: this.authFormTypes.SIGNUP,
        payload: { email: formData.email!, password: formData.password! },
      });
    }
  }
}
