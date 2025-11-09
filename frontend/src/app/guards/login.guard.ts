import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { SessionTimeoutService } from '../services/session-timeout.service';

export const loginGuard = () => {
  const authService = inject(AuthService);
  const sessionTimeoutService = inject(SessionTimeoutService);
  const router = inject(Router);

  console.log('LoginGuard: Checking login guard');
  
  // If session was expired, don't auto-redirect even if token exists
  const wasExpired = sessionTimeoutService.wasSessionExpired();
  console.log('LoginGuard: Session was expired:', wasExpired);
  
  if (wasExpired) {
    console.log('LoginGuard: Allowing access to login page due to expired session');
    return true; // Allow access to login page
  }

  const isAuth = authService.isAuthenticated();
  console.log('LoginGuard: Is authenticated:', isAuth);
  
  if (isAuth) {
    console.log('LoginGuard: Redirecting to dashboard');
    router.navigate(['/dashboard/home']);
    return false;
  } else {
    console.log('LoginGuard: Allowing access to login page');
    return true;
  }
};