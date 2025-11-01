import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: {
    id: number;
    username: string;
    email?: string;
    firstName?: string;
    lastName?: string;
  };
}

export interface UserProfile {
  id: number;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  createdAt?: string;
}

export interface SignupRequest {
  username: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface SignupResponse {
  success: boolean;
  message: string;
  user?: {
    id: number;
    username: string;
    email: string;
  };
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ForgotPasswordResponse {
  success: boolean;
  message: string;
}

export interface ResetPasswordRequest {
  resetCode: string;
  newPassword: string;
}

export interface ResetPasswordResponse {
  success: boolean;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = 'http://localhost:5134/api/auth'; // Updated to use new port
  private readonly tokenKey = 'authToken';
  private readonly userKey = 'currentUser';

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // Authentication service initialized
    // Token and user state will be preserved from localStorage
  }

  login(username: string, password: string): Observable<LoginResponse> {
    const loginData: LoginRequest = { username, password };
    
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, loginData)
      .pipe(
        tap(response => {
          if (response.success && response.token) {
            this.setToken(response.token);
            if (response.user) {
              this.setCurrentUser(response.user);
            }
          }
        })
      );
  }

  signup(username: string, email: string, password: string, firstName?: string, lastName?: string): Observable<SignupResponse> {
    const signupData: SignupRequest = { username, email, password, firstName, lastName };
    
    return this.http.post<SignupResponse>(`${this.apiUrl}/signup`, signupData);
  }

  forgotPassword(email: string): Observable<ForgotPasswordResponse> {
    const forgotPasswordData: ForgotPasswordRequest = { email };
    
    return this.http.post<ForgotPasswordResponse>(`${this.apiUrl}/forgot-password`, forgotPasswordData);
  }

  resetPassword(resetCode: string, newPassword: string): Observable<ResetPasswordResponse> {
    const resetPasswordData: ResetPasswordRequest = { resetCode, newPassword };
    
    return this.http.post<ResetPasswordResponse>(`${this.apiUrl}/reset-password`, resetPasswordData);
  }

  logout(): void {
    this.removeToken();
    this.removeCurrentUser();
  }

  // Method to validate if the stored token and user are still valid
  validateStoredAuth(): boolean {
    const token = this.getToken();
    const user = this.getCurrentUser();
    
    if (!token || !user) {
      // If either is missing, clear both and return false
      this.logout();
      return false;
    }
    
    return true;
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    const user = this.getCurrentUser();
    
    // Check if both token and user exist
    return !!(token && user);
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(this.tokenKey);
    }
    return null;
  }

  getCurrentUser(): any | null {
    if (isPlatformBrowser(this.platformId)) {
      const userStr = localStorage.getItem(this.userKey);
      return userStr ? JSON.parse(userStr) : null;
    }
    return null;
  }

  getUserProfile(): Observable<UserProfile> {
    const token = this.getToken();
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return this.http.get<UserProfile>(`${this.apiUrl}/profile`, { headers });
  }

  private setToken(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.tokenKey, token);
    }
  }

  private removeToken(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.tokenKey);
    }
  }

  private setCurrentUser(user: any): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.userKey, JSON.stringify(user));
    }
  }

  private removeCurrentUser(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.userKey);
    }
  }
}