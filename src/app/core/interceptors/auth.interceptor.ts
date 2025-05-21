import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';
import { AuthService } from '@services/auth.service';
import { GlobalStore } from 'app/state/global.state';
import { BehaviorSubject, catchError, EMPTY, filter, switchMap, take, throwError } from 'rxjs';

let isRefreshing = false;
const tokenSubject = new BehaviorSubject<string | null>(null);

/**
 *
 * @param req
 * @param next
 * @returns
 */
export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const globalStore = inject(GlobalStore);
  const router = inject(Router);
  const authService = inject(AuthService);
  const token = authService.getBearerToken;

  if (!req.url.includes('login')) {
    if (req.url.startsWith(environment.apiUrl) && token) {
      req = addToken(req, token);
    } else {
      router.navigate(['/login']);
      authService.resetToken();
      globalStore.clearState();
      return EMPTY;
    }
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && error.error.message === 'Access Denied. Invalid token.') {
        if (!isRefreshing) {
          isRefreshing = true;
          tokenSubject.next(null);
          return authService.refreshToken().pipe(
            switchMap((res: { token: string }) => {
              //Saving new token
              authService.setBearerToken = res.token;
              isRefreshing = false;
              tokenSubject.next(res.token);
              return next(addToken(req, res.token));
            }),
            catchError((error) => {
              isRefreshing = false;
              router.navigate(['/login']);
              authService.resetToken();
              globalStore.clearState();
              return throwError(() => error);
            }),
          );
        } else {
          return tokenSubject.pipe(
            filter((token: string | null) => token != null),
            take(1),
            switchMap((token) => next(addToken(req, token))),
          );
        }
      }
      return throwError(() => error);
    }),
  );
};

/**
 *
 */
const addToken = (request: HttpRequest<unknown>, token: string): HttpRequest<unknown> => {
  return request.clone({
    setHeaders: {
      authorization: 'Bearer ' + token,
    },
  });
};
