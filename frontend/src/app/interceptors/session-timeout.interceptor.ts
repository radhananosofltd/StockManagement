import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SessionTimeoutService } from '../services/session-timeout.service';
import { AuthService } from '../services/auth.service';

@Injectable()
export class SessionTimeoutInterceptor implements HttpInterceptor {

  constructor(
    private sessionTimeoutService: SessionTimeoutService,
    private authService: AuthService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Only track activity for authenticated users and non-authentication endpoints
    const isAuthEndpoint = req.url.includes('/auth/') || req.url.includes('/login') || req.url.includes('/signup');
    const isAuthenticated = this.authService.isAuthenticated();

    return next.handle(req).pipe(
      tap({
        next: (event: HttpEvent<any>) => {
          // Reset session timer on successful HTTP responses for authenticated users
          if (event instanceof HttpResponse && isAuthenticated && !isAuthEndpoint) {
            this.sessionTimeoutService.resetTimer();
            console.log('Session timer reset due to API activity');
          }
        },
        error: (error: HttpErrorResponse) => {
          // Handle session timeout responses from backend
          if (error.status === 401 && isAuthenticated) {
            console.log('Session timeout detected from backend response');
            // Let the session timeout service handle the expiration
            this.sessionTimeoutService.navigateToLogin();
          }
        }
      })
    );
  }
}