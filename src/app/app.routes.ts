import { Routes } from '@angular/router';
import { LoginComponent } from '@features/auth/login/login.component';
import { DashboardRoutes } from '@layouts/dashboard-layout/dashboard.routes';
import { authGuard, roleGuard } from '@core/guards/permissions.service';
import { APP_ROUTES } from '@core/routes.constants';

export const routes: Routes = [
  
  {
    path: APP_ROUTES['AUTHENTIFICATION'].route,
    component: LoginComponent,
    canActivate: [],
  },
  {
    path: APP_ROUTES['DASHBOARD'].route,
    loadComponent: () =>
      import('@layouts/dashboard-layout/dashboard-layout.component').then(
        (c) => c.DashboardLayoutComponent
      ),
    children: DashboardRoutes,
    canActivate: [authGuard],
    canActivateChild: [roleGuard],
  },
  {
    path: APP_ROUTES['UNAUTHORIZED'].route,
    loadComponent: () =>
      import('@shared/pages/unauthorized/unauthorized.component').then(
        (c) => c.UnauthorizedComponent
      ),
  },
  {
    path: APP_ROUTES['PAGE_NOT_FOUND'].route,
    loadComponent: () =>
      import('@shared/pages/page-not-found/page-not-found.component').then(
        (c) => c.PageNotFoundComponent
      ),
  }, 
];
