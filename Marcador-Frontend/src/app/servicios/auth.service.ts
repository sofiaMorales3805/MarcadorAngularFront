import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Login as LoginDto } from '../modelos/dto/login';
import { LoginResponse } from '../modelos/dto/login-response';
import { HttpClient } from '@angular/common/http';
import { Global } from './global';
import { Observable } from 'rxjs';
import { RegisterResponseDto } from '../modelos/dto/register-response-dto';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  private tokenKey = 'auth_token';
  private url: string;
  private readonly userKey = 'auth_user';

  constructor(private router: Router,
    private http: HttpClient
  ) {
    this.url = Global.url;
  }

  private hasToken(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  login(login: LoginDto): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.url + '/auth/login', login);
  }

  saveLoginData(response: LoginResponse): void {
    localStorage.setItem(this.tokenKey, response.token);
    localStorage.setItem(
      this.userKey,
      JSON.stringify({ username: response.username, role: response.role?.name })
    );
    this.isLoggedInSubject.next(true);
  }

  logout(): void {
    // Llamar al backend opcionalmente
    this.http.post(`${Global.url}/auth/logout`, {}).subscribe({
      next: () => {
        console.log("Sesión cerrada en servidor.");
      },
      error: (err) => {
        console.warn("No se pudo notificar al backend:", err);
      }
    });

    // Borrar el token y datos locales
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    this.isLoggedInSubject.next(false);

    // Redirigir a login
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  isAuthenticatedAsync(): Observable<boolean> {
    return this.validateToken().pipe(
      map(res => res.valid),
      catchError(() => of(false))
    );
  }

  getToken(): string | null {
    if (!this.isBrowser())
      return null;
    return localStorage.getItem(this.tokenKey);
  }

  getUsername(): string | null {
    return this.getUser()?.username ?? null;
  }

  getRole(): string | null {
    return this.getUser()?.role ?? null;
  }

  private getUser(): { username: string; role: string } | null {
    const raw = localStorage.getItem(this.userKey);
    return raw ? JSON.parse(raw) : null;
  }

  register(data: { username: string; password: string; roleId: number }) {
    return this.http.post<RegisterResponseDto>(`${Global.url}/auth/register`, data);
  }

  getRoles() {
    return this.http.get<{ id: number; name: string }[]>(`${Global.url}/role`);
  }

  validateToken(): Observable<{ valid: boolean }> {
    return this.http.get<{ valid: boolean }>(`${Global.url}/auth/validate`);
  }
}
