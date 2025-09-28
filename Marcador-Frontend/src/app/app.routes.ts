import { Routes } from '@angular/router';
import { TableroComponent } from './pages/tablero.component';
import { PublicoComponent } from './publico/tablero-publico.component';
import { Login } from './pages/login/login';
import { RegistroUsuarios } from './pages/registro-usuarios/registro-usuarios';
import { authGuard } from './guards/auth-guard';
import { RoleGuard } from './guards/role-guard';
import { UsuariosListaComponent } from './pages/usuarios/usuarios.lista.component';
import { RolesListaComponent } from './pages/roles/roles.lista.component';

export const routes: Routes = [
  // Arrancar en login
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Login & Registro
  { path: 'login', component: Login },
  { path: 'register', component: RegistroUsuarios },

  // Dashboard (para cualquier autenticado: Admin o User)
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./pages/dashboard/dashboard.component')
        .then(m => m.DashboardComponent),
    title: 'Panel de Administración',
    canActivate: [authGuard]
  },
  // Tablero de control (clásico)
  { path: 'control', component: TableroComponent, canActivate: [authGuard] },

  // Público (no requiere login)
  { path: 'publico', component: PublicoComponent },

  // Equipos (sección Admin)
  {
    path: 'admin/equipos',
    loadComponent: () =>
      import('./pages/equipos/equipos-lista.component')
        .then(m => m.EquiposListaComponent),
    title: 'Gestión de Equipos',
    canActivate: [authGuard, RoleGuard],
    data: { roles: ['Admin'] } // <-- Admin
  },

  // Jugadores (sección Admin)
  {
    path: 'admin/jugadores',
    loadComponent: () =>
      import('./pages/jugadores/jugadores-lista.component')
        .then(m => m.JugadoresListaComponent),
    title: 'Gestión de Jugadores',
    canActivate: [authGuard, RoleGuard],
    data: { roles: ['Admin'] } // <-- Admin
  },

  // Usuarios (sección Admin)
  {
    path: 'admin/usuarios',
    loadComponent: () =>
      import('./pages/usuarios/usuarios.lista.component')
        .then(m => m.UsuariosListaComponent),
    title: 'Gestión de Usuarios',
    canActivate: [authGuard, RoleGuard],
    data: { roles: ['Admin'] } // <-- Admin
  },

  // Roles  (sección Admin)
  {
    path: 'admin/roles',
    loadComponent: () =>
      import('./pages/roles/roles.lista.component')
        .then(m => m.RolesListaComponent),
    title: 'Gestión de Roles',
    canActivate: [authGuard, RoleGuard],
    data: { roles: ['Admin'] } // <-- Admin
  },



  // Wildcard
  { path: '**', redirectTo: 'login' }
];  
