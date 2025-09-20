import { Routes } from '@angular/router';
import { TableroComponent } from './caracteristicas/tablero.component';
import { PublicoComponent } from './publico/tablero-publico.component';

export const routes: Routes = [
  // Arrancar en Dashboard
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

  // Operación/Visualización existentes
  { path: 'control', component: TableroComponent },
  { path: 'publico', component: PublicoComponent },

  // Dashboard (lazy)
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./pages/dashboard/dashboard.component')
        .then(m => m.DashboardComponent),
    title: 'Panel de Administración'
  },

  // Equipos (ya implementado)
  {
    path: 'admin/equipos',
    loadComponent: () =>
      import('./pages/equipos/equipos-lista.component')
        .then(m => m.EquiposListaComponent),
    title: 'Gestión de Equipos'
  },

  // Jugadores (placeholder por ahora; lo implementamos luego)
  {
    path: 'admin/jugadores',
    loadComponent: () =>
      import('./pages/jugadores/jugadores-lista.component')
        .then(m => m.JugadoresListaComponent),
    title: 'Gestión de Jugadores'
  },

  {
  path: 'admin/jugadores',
  loadComponent: () =>
    import('./pages/jugadores/jugadores-lista.component')
      .then(m => m.JugadoresListaComponent),
  title: 'Gestión de Jugadores'
},

  // Wildcard
  { path: '**', redirectTo: 'dashboard' }
];
