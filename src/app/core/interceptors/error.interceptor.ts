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
        if (event instanceof HttpResponse && event.status === 200) {
          snackBar.open('Operation successful', 'Close', {
            duration: 3000,
            panelClass: 'success-snack',
          });
        }
      },
    }),
    catchError((error: HttpErrorResponse) => {
      const errorMessage = getErrorMessage(error);
      snackBar.open(errorMessage, 'Close', {
        duration: 5000,
        panelClass: 'error-snack',
      });
      return throwError(() => error);
    }),
  );
};

// Helper function for error messages
const getErrorMessage = (error: HttpErrorResponse): string => {
  switch (error.status) {
    case 400:
      return 'Invalid request';
    case 401:
      return 'Please login to continue';
    case 403:
      return 'Access denied';
    case 500:
      return 'Server error occurred';
    default:
      return 'An unexpected error occurred';
  }
};
