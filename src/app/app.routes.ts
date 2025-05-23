import { Routes } from '@angular/router';
import { LoginLayoutComponent } from './layout/login-layout/login-layout.component';
import { SecureLayoutComponent } from './layout/secure-layout/secure-layout.component';
import { NotFoundComponent } from './layout/not-found/not-found.component';
import { authGuard } from './core/guards/auth.guard';
import { RouteData } from '@models/route.model';

export const routes: Routes = [
  {
    path: '',
    component: LoginLayoutComponent,
    pathMatch: 'full',
    data: {
      title: 'Login',
      name: 'Login',
    } as RouteData,
  },
  {
    path: 'login',
    component: LoginLayoutComponent,
    data: {
      title: 'Login',
      name: 'Login',
      showInNav: false,
    } as RouteData,
  },
  {
    path: 'layout',
    component: SecureLayoutComponent,
    canMatch: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent,
          ),
        data: {
          title: 'Dashboard',
          name: 'Dashboard',
          showInNav: true,
        } as RouteData,
      },
      {
        path: 'food-search',
        loadComponent: () =>
          import('./features/food-search/food-search.component').then(
            (m) => m.FoodSearchComponent,
          ),
        data: {
          title: 'Food Search',
          name: 'Food Search',
          showInNav: true,
        } as RouteData,
      },
      {
        path: 'meal-board',
        loadComponent: () =>
          import('./features/meal-board/meal-board.component').then(
            (m) => m.MealBoardComponent,
          ),
        data: {
          title: 'Meal Board',
          name: 'Meal Board',
          showInNav: true,
        } as RouteData,
      },
      {
        path: 'recipes',
        loadComponent: () =>
          import('./features/recipes/recipes.component').then(
            (m) => m.RecipesComponent,
          ),
        data: {
          title: 'Recipes',
          name: 'Recipes',
          showInNav: true,
        } as RouteData,
      },
      {
        path: 'meal-statistics',
        loadComponent: () =>
          import('./features/meal-statistics/meal-statistics.component').then(
            (m) => m.MealStatisticsComponent,
          ),
        data: {
          title: 'Meal Statistics',
          name: 'Meal Statistics',
          showInNav: true,
        } as RouteData,
      },
    ],
  },
  {
    path: '**',
    component: NotFoundComponent,
    pathMatch: 'full',
    data: {
      title: 'Not Found',
      name: 'Not Found',
      showInNav: false,
    } as RouteData,
  },
];
