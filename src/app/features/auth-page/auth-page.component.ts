import { Component, inject } from '@angular/core'
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { CommonModule } from '@angular/common'

type ToFormGroup<T> = {
  [P in keyof T]: FormControl<T[P]>
}

interface LoginForm {
  email: string | null
  password: string | null
}

export type LoginFormControls = ToFormGroup<LoginForm>

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
  ],
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.scss',
})
export class AuthPageComponent {
  formBuilder: FormBuilder = inject(FormBuilder)
  loginForm: FormGroup<LoginFormControls> = this.initializeForm()
  private passwordPattern =
    '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}'

  /**
   *
   * @returns
   */
  private initializeForm(): FormGroup<LoginFormControls> {
    return this.formBuilder?.group<LoginFormControls>({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        // Validators.minLength(8),
        Validators.pattern(this.passwordPattern),
      ]),
    })
  }

  get emailFormControl(): FormControl<string> {
    return this.loginForm.get('email') as FormControl
  }

  get passwordFormControl(): FormControl<string> {
    return this.loginForm.get('password') as FormControl
  }

  /**
   *
   */
  onSubmit(): void {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value
      console.log(formData)
    }
  }
}
