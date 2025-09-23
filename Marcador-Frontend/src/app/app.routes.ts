import { Routes } from '@angular/router';
import { TableroComponent } from './pages/tablero.component';
import { PublicoComponent } from './publico/tablero-publico.component';  
import { Login } from './pages/login/login';
import { authGuard } from './guards/auth-guard';
import { RegistroUsuarios } from './pages/registro-usuarios/registro-usuarios';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'register', component: RegistroUsuarios },
  { 
    path: 'control', 
    component: TableroComponent, 
    canActivate: [authGuard] // Para que no pueda ingresar sin hacer login
  }, 
  { path: 'publico', component: PublicoComponent }, 
  { path: '**', redirectTo: 'login' }
];
