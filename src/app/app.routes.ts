import { Routes } from '@angular/router';
import { LoginLayoutComponent } from './layout/login-layout/login-layout.component';
import { SecureLayoutComponent } from './layout/secure-layout/secure-layout.component';
import { NotFoundComponent } from './layout/not-found/not-found.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: LoginLayoutComponent,
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginLayoutComponent,
  },
  {
    path: '',
    component: SecureLayoutComponent,
    canMatch: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent)
      },
    ],
  },
  {
    path: '**',
    component: NotFoundComponent,
    pathMatch: 'full',
  },
];
