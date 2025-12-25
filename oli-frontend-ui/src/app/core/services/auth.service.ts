import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap, of, delay } from 'rxjs';
import { environment } from '@environments/environment';
import { User, AuthResponse, LoginRequest } from '../models/auth.model';
import mockData from '../data/mock-data.json';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  
  private currentUserSubject = new BehaviorSubject<User | null>(this.getUserFromStorage());
  public currentUser$ = this.currentUserSubject.asObservable();

  get currentUser(): User | null {
    return this.currentUserSubject.value;
  }

  get isAuthenticated(): boolean {
    return !!this.getToken();
  }

  login(request: LoginRequest): Observable<AuthResponse> {
    console.log('login() called with:', request);
    console.log('environment.useMockData:', environment.useMockData);
    
    // Mock mode for development
    if (environment.useMockData) {
      console.log('Using mock mode');
      const user = mockData.users.find(u => u.email === request.email) || mockData.users[0];
      console.log('Found user:', user);
      
      const mockResponse: AuthResponse = {
        user: user as User,
        token: 'mock-token-' + Date.now()
      };
      
      return of(mockResponse).pipe(
        delay(500), // Simulate network delay
        tap(response => {
          console.log('Setting session and navigating...');
          this.setSession(response);
          console.log('Navigating to /chat');
          this.router.navigate(['/chat']);
        })
      );
    }

    return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/login`, request)
      .pipe(
        tap(response => {
          this.setSession(response);
          this.router.navigate(['/chat']);
        })
      );
  }

  loginWithSSO(email: string): void {
    console.log('loginWithSSO called with email:', email);
    console.log('useMockData:', environment.useMockData);
    
    // In mock mode, use regular login
    if (environment.useMockData) {
      console.log('Using mock data, calling login()');
      this.login({ email }).subscribe({
        next: (response) => {
          console.log('Login successful:', response);
        },
        error: (err) => {
          console.error('Login error:', err);
        }
      });
      return;
    }
    
    console.log('Redirecting to SSO URL');
    window.location.href = `${environment.ssoUrl}?email=${encodeURIComponent(email)}`;
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  private setSession(authResponse: AuthResponse): void {
    localStorage.setItem('token', authResponse.token);
    localStorage.setItem('user', JSON.stringify(authResponse.user));
    this.currentUserSubject.next(authResponse.user);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  private getUserFromStorage(): User | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }
}
