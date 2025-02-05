import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanMatchFn = (route, state) => {
  const isUserValid = inject(AuthService).isUserValid();
  const router = inject(Router);
  if (isUserValid) return true;
  router.navigate(['/login']);
  return false;
};
