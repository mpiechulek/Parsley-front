import { HttpErrorResponse } from '@angular/common/http';

export interface GlobalState {
  appInit: boolean;
  isLoading: boolean;
  isUserAuthorized: boolean;
  isSignup: boolean;
  bearerToken: string | null;
  error: HttpErrorResponse | null;
}
