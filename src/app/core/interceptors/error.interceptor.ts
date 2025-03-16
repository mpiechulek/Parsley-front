import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

// Functional interceptor
export const errorInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
) => {
  const snackBar = inject(MatSnackBar);
  return next(req).pipe(
    tap({
      // Handle successful responses
      next: (event) => {
        if (
          event instanceof HttpResponse &&
          (event.status === 200 || event.status === 201)
        ) {
          snackBar.open('Operation successful', 'Close', {
            duration: 3000,
            panelClass: 'success-snack',
            horizontalPosition: 'right',
          });
        }
      },
    }),
    catchError((err: HttpErrorResponse) => {
      let errorMessage = '';

      if (err && err.error.error && err.error.error.message) {
        errorMessage = err.error.error.message + ' ' + err.error.error.details;
      } else {
        errorMessage = getErrorMessage(err);
      }

      snackBar.open(errorMessage, 'Close', {
        duration: 5000,
        panelClass: 'error-snack',
        horizontalPosition: 'right',
      });
      return throwError(() => err);
    }),
  );
};

// Helper function for error messages
const getErrorMessage = (error: HttpErrorResponse): string => {
  switch (error.status) {
    case 400:
      return 'Invalid request';
    case 401:
      return 'Unauthorized';
    case 403:
      return 'Access denied';
    case 500:
      return 'Server error occurred';
    default:
      return 'An unexpected error occurred';
  }
};
