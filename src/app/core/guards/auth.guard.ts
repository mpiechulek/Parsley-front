import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanMatchFn = () => {
  const router = inject(Router);
  const isUserValid = inject(AuthService);
  if (isUserValid.getBearerToken) return true;
  router.navigate(['/login']);
  return false;
};
