import { FormControl } from "@angular/forms";

type ToFormGroup<T> = {
  [P in keyof T]: FormControl<T[P]>;
};

export interface AuthForm {
  email: string | null;
  password: string | null;
  confirmPassword?: string | null;
}

export enum AuthFormType {
  LOGIN = 'login',
  SIGNUP = 'signup',
}

export interface AuthAction {
  type: AuthFormType;
  payload: AuthForm;
}

export type AuthFormControls = ToFormGroup<AuthForm>;
