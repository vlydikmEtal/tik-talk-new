import { Routes } from '@angular/router';
import {LoginPageComponent} from './pages/login-page/login-page.component';
import {canActivateAuth} from './auth/acces.guard';

export const routes: Routes = [
  {path: '', loadComponent: () => import('./common-ui/layout/layout.component').then(c => c.LayoutComponent), children: [
      {path: '', redirectTo: 'profile/me', pathMatch: 'full'},
      {path: 'search', loadComponent: () => import('./pages/search-page/search-page.component').then(c => c.SearchPageComponent)},
      {path: 'profile/:id', loadComponent: () => import('./pages/profile-page/profile-page.component').then(c => c.ProfilePageComponent)},
      {path: 'settings', loadComponent: () => import('./pages/setting-page/setting-page.component').then(c => c.SettingPageComponent)},
    ],
    canActivate: [canActivateAuth]
  },
  {path: 'login', component: LoginPageComponent}
];
