import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./pages/dashboard/dashboard.component').then((m) => m.DashboardComponent),
  },
  {
    path: 'board',
    loadComponent: () => import('./pages/board/board.component').then((m) => m.BoardComponent),
  },
  {
    path: 'archive',
    loadComponent: () =>
      import('./pages/archive/archive.component').then((m) => m.ArchiveComponent),
  },
  { path: '**', redirectTo: 'dashboard' },
];
