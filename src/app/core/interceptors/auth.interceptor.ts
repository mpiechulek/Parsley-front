import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@environments/environment.development';
import { AuthService } from '@services/auth.service';
import { GlobalStore } from 'app/state/global.state';
import { EMPTY } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const globalStore = inject(GlobalStore);
  const router = inject(Router);
  const bToken = authService.getBearerToken;
  if(req.url.startsWith(environment.apiUrl)){
    if (bToken) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${bToken}`,
        },
      });
    }
  } else {
    router.navigate(['/login']);
    authService.resetTokens();
    globalStore.clearState();
    return EMPTY;
  }
  return next(req);
};
