import { Routes } from '@angular/router';
import { TableroComponent } from './caracteristicas/tablero.component';
import { TableroPublicoComponent } from './publico/tablero-publico.component';
import { BracketComponent } from './pages/torneos/bracket.component';


export const routes: Routes = [
  // Arrancar en Dashboard
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

  // Operación/Visualización existentes
    { path: 'publico/:id', loadComponent: () => import('./publico/tablero-publico.component').then(m => m.TableroPublicoComponent) },
  { path: 'publico',     loadComponent: () => import('./publico/tablero-publico.component').then(m => m.TableroPublicoComponent) },
  { path: 'control', component: TableroComponent },
  { path: 'publico', component: TableroPublicoComponent },
    { path: 'control/:id', component: TableroComponent },
    { path: 'admin/torneos/:id/bracket', component: BracketComponent },

  // Dashboard (lazy)
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./pages/dashboard/dashboard.component')
        .then(m => m.DashboardComponent),
    title: 'Panel de Administración'
  },

  // Equipos 
  {
    path: 'admin/equipos',
    loadComponent: () =>
      import('./pages/equipos/equipos-lista.component')
        .then(m => m.EquiposListaComponent),
    title: 'Gestión de Equipos'
  },

  // Jugadores 
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
{
  path: 'admin/partidos/historial',
  loadComponent: () => import('./pages/partidos/partidos-historial.component')
    .then(m => m.PartidosHistorialComponent),
  title: 'Historial de Partidos'
},
{
  path: 'admin/torneos/nuevo',
  loadComponent: () => import('./pages/torneos/torneos-nuevo.component')
    .then(m => m.TorneosNuevoComponent),
  title: 'Nuevo Torneo'
},
{
  path: 'admin/partidos/:id/roster',
  loadComponent: () =>
    import('./pages/partidos/partido-roster.component')
      .then(m => m.PartidoRosterComponent),
  title: 'Asignar Roster'
},
{
  path: 'admin/torneos/:id/bracket',
  loadComponent: () =>
    import('./pages/torneos/bracket.component')
      .then(m => m.BracketComponent),
  title: 'Llaves del Torneo'
},
{
  path: 'admin/torneos/:id/bracket',
  loadComponent: () =>
    import('./pages/torneos/bracket.component').then(m => m.BracketComponent)
},
{
  path: 'control/:id',
  component: TableroComponent,   
  title: 'Tablero de control'
},

  // Wildcard
  { path: '**', redirectTo: 'dashboard' }
];