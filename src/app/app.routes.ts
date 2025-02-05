import { Routes } from '@angular/router';
import { LoginLayoutComponent } from './layout/login-layout/login-layout.component';
import { SecureLayoutComponent } from './layout/secure-layout/secure-layout.component';
import { NotFoundComponent } from './layout/not-found/not-found.component';

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
    children: [
      // {
      //   path: 'dashboard']
      //   loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule)
      // },
    ],
  },
  {
    path: '**',
    component: NotFoundComponent,
    pathMatch: 'full',
  },
];
