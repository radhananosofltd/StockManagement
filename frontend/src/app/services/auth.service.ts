import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../constants/environment.constants';

export interface User {
  userId: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  createdDate: string;
  lastLoginDate?: string;
  isActive: boolean;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: User;
}

export interface SignupRequest {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface SignupResponse {
  success: boolean;
  message: string;
  user?: User;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ForgotPasswordResponse {
  success: boolean;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiBaseUrl}/api/auth`;
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);

  public currentUser$ = this.currentUserSubject.asObservable();
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // Check if user is already logged in on service initialization
    this.checkAuthState();
  }

  private checkAuthState(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return; // Skip localStorage access on server
    }
    
    const token = this.getToken();
    const userData = localStorage.getItem('currentUser');
    
    if (token && userData) {
      try {
        const user = JSON.parse(userData);
        this.currentUserSubject.next(user);
        this.isLoggedInSubject.next(true);
      } catch (error) {
        this.logout();
      }
    }
  }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap(response => {
          if (response.success && response.token && response.user) {
            this.setAuthData(response.token, response.user);
          }
        })
      );
  }

  signup(signupData: SignupRequest): Observable<SignupResponse> {
    return this.http.post<SignupResponse>(`${this.apiUrl}/signup`, signupData);
  }

  forgotPassword(email: string): Observable<ForgotPasswordResponse> {
    return this.http.post<ForgotPasswordResponse>(`${this.apiUrl}/forgot-password`, { email });
  }

  logout(): void {
    // Call logout endpoint if needed
    this.http.post(`${this.apiUrl}/logout`, {}).subscribe({
      error: (error) => console.error('Logout error:', error)
    });

    // Clear local storage and subjects
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('currentUser');
    }
    this.currentUserSubject.next(null);
    this.isLoggedInSubject.next(false);
  }

  getToken(): string | null {
    if (!isPlatformBrowser(this.platformId)) {
      return null; // Return null on server
    }
    return localStorage.getItem('authToken');
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }

    // Check if token is expired
    try {
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      return tokenPayload.exp > currentTime;
    } catch (error) {
      return false;
    }
  }

  private setAuthData(token: string, user: User): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('authToken', token);
      localStorage.setItem('currentUser', JSON.stringify(user));
    }
    this.currentUserSubject.next(user);
    this.isLoggedInSubject.next(true);
  }

  getFullUserName(): string {
    const user = this.getCurrentUser();
    if (user) {
      return `${user.firstName} ${user.lastName}`.trim();
    }
    return '';
  }
}