import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormRecord, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

type ToFormGroup<T> = {
  [P in keyof T]: FormControl<T[P]>;
};

interface LoginForm {
  email: string  |null;
  password: string | null;
}

export type LoginFormControls = ToFormGroup<LoginForm>;

@Component({
  selector: 'pars-auth-page',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.scss',
})
export class AuthPageComponent {
  loginForm: FormGroup<LoginFormControls> = this.initializeForm();
  formBuilder: FormBuilder = inject(FormBuilder);


  private initializeForm() {
    return this.loginForm = this.formBuilder.group<LoginFormControls>({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ])
    });
  }

  get emailFormControl() {
    return this.loginForm.get('email') as FormControl;
  }

  get passwordFormControl() {
    return this.loginForm.get('password') as FormControl;
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      console.log('Login submitted:', formData);
      // Add your authentication logic here
    }
  }
}
