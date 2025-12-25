import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: '',
    loadComponent: () => import('./features/chat/chat-layout/chat-layout.component').then(m => m.ChatLayoutComponent),
    children: [
      {
        path: '',
        redirectTo: 'chat',
        pathMatch: 'full'
      },
      {
        path: 'chat',
        loadComponent: () => import('./features/chat/chat-main/chat-main.component').then(m => m.ChatMainComponent)
      },
      {
        path: 'chat/:id',
        loadComponent: () => import('./features/chat/chat-main/chat-main.component').then(m => m.ChatMainComponent)
      },
      {
        path: 'settings',
        loadComponent: () => import('./features/settings/settings.component').then(m => m.SettingsComponent)
      },
      {
        path: 'help',
        loadComponent: () => import('./features/help/help.component').then(m => m.HelpComponent)
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
