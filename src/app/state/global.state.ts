import { GlobalState } from '@models/global-state.model';
import {
  patchState,
  signalState,
  signalStore,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { AuthService } from '@services/auth.service';
import { inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

export const initialGlobalState = signalState<GlobalState>({
  appInit: false,
  isLoading: false,
  isUserAuthorized: false,
  isSignup: false,
  bearerToken: null,
  error: null,
});

export const GlobalStore = signalStore(
  { providedIn: 'root' },
  withState<GlobalState>(initialGlobalState),
  withDevtools('globalStore'),
  withMethods(
    (store, authService = inject(AuthService), router = inject(Router)) => ({
      stateInit: (): void => {
        patchState(store, { appInit: true });
      },
      loginUser: (email: string, password: string): void => {
        patchState(store, {
          isLoading: true,
        });
        authService.loginUser(email, password).subscribe({
          next: () => {
            patchState(store, {
              isLoading: false,
              error: null,
              isUserAuthorized: true,
            });
            router.navigate(['/dashboard']);
          },
          error: (err: HttpErrorResponse) => {
            patchState(store, { isLoading: false, error: err });
            console.error(err);
          },
        });
      },
      signUpNewUser: (email: string, password: string): void => {
        patchState(store, {
          isLoading: true,
          isSignup: false,
        });
        authService.signUpNewUser(email, password).subscribe({
          next: () => {
            patchState(store, {
              isLoading: false,
              error: null,
              isSignup: true,
            });
          },
          error: (err: HttpErrorResponse) => {
            patchState(store, { isLoading: false, error: err });
          },
        });
      },
      clearState: (): void => {
        patchState(store, initialGlobalState);
      },
    }),
  ),
  withHooks({
    onInit: ({ stateInit }): void => {
      stateInit();
    },
    onDestroy: ({ clearState }): void => {
      clearState();
    }
  }),
);
