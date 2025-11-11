import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, timer, Subscription } from 'rxjs';
import { SessionConfigService } from '../config/session-config.service';

@Injectable({
  providedIn: 'root'
})
export class SessionTimeoutService {
  private readonly SESSION_EXPIRED_FLAG = 'sessionExpired';

  private sessionTimer?: Subscription;
  private warningTimer?: Subscription;
  private lastActivity: number = Date.now();
  
  private sessionWarningSubject = new BehaviorSubject<boolean>(false);
  private sessionExpiredSubject = new BehaviorSubject<boolean>(false);

  public sessionWarning$ = this.sessionWarningSubject.asObservable();
  public sessionExpired$ = this.sessionExpiredSubject.asObservable();

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private sessionConfigService: SessionConfigService
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.setupActivityListeners();
    }
  }

  /**
   * Update session configuration (useful for getting settings from backend)
   */
  updateSessionConfig(timeoutMinutes?: number, warningMinutes?: number): void {
    if (timeoutMinutes || warningMinutes) {
      this.sessionConfigService.setConfig({
        timeoutMinutes: timeoutMinutes || this.sessionConfigService.getConfig().timeoutMinutes,
        warningMinutes: warningMinutes || this.sessionConfigService.getConfig().warningMinutes
      });
      
      console.log(`Session config updated: ${timeoutMinutes || this.sessionConfigService.getConfig().timeoutMinutes} min timeout, ${warningMinutes || this.sessionConfigService.getConfig().warningMinutes} min warning`);
      
      // If timer is running, restart with new config
      if (this.sessionTimer || this.warningTimer) {
        this.resetTimer();
      }
    }
  }

  /**
   * Get current session configuration
   */
  getSessionConfig() {
    return this.sessionConfigService.getConfig();
  }

  /**
   * Start the session timeout timer
   */
  startSessionTimer(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.resetTimer();
    const timeoutMinutes = this.sessionConfigService.getConfig().timeoutMinutes;
    console.log(`Session timeout timer started - ${timeoutMinutes} minutes`);
  }

  /**
   * Stop the session timeout timer
   */
  stopTimer(): void {
    if (this.sessionTimer) {
      this.sessionTimer.unsubscribe();
      this.sessionTimer = undefined;
    }
    if (this.warningTimer) {
      this.warningTimer.unsubscribe();
      this.warningTimer = undefined;
    }
    console.log('Session timeout timer stopped');
  }

  /**
   * Reset the session timer due to user activity
   */
  resetTimer(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.lastActivity = Date.now();
    this.stopTimer();
    
    // Clear any existing warnings
    this.sessionWarningSubject.next(false);

    const sessionTimeoutMs = this.sessionConfigService.getTimeoutMs();
    const warningTimeMs = this.sessionConfigService.getWarningMs();

    // Set warning timer (timeout - warning time)
    this.warningTimer = timer(sessionTimeoutMs - warningTimeMs).subscribe(() => {
      const warningMinutes = this.sessionConfigService.getConfig().warningMinutes;
      console.log(`🚨 SESSION WARNING: ${warningMinutes} minutes remaining`);
      this.sessionWarningSubject.next(true);
    });

    // Set session expiration timer
    this.sessionTimer = timer(sessionTimeoutMs).subscribe(() => {
      console.log('💀 SESSION EXPIRED due to inactivity');
      this.handleSessionTimeout();
    });

    const timeoutMins = this.sessionConfigService.getConfig().timeoutMinutes;
    const warningMins = this.sessionConfigService.getConfig().warningMinutes;
    console.log(`⏰ Session timer reset - Warning in ${timeoutMins - warningMins} min, Expiry in ${timeoutMins} min`);
  }

  /**
   * Handle session timeout
   */
  private handleSessionTimeout(): void {
    this.stopTimer();
    this.setSessionExpiredFlag();
    this.sessionExpiredSubject.next(true);
    console.log('Session expired - redirecting to login');
  }

  /**
   * Setup activity listeners for user interaction
   */
  private setupActivityListeners(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    // Only listen to significant user interactions, not mouse movements
    const events = ['click', 'keypress', 'scroll'];
    
    events.forEach(event => {
      document.addEventListener(event, () => {
        const now = Date.now();
        const activityCheckInterval = this.sessionConfigService.getActivityCheckInterval();
        // Only reset timer if significant time has passed to avoid excessive resets
        if (now - this.lastActivity > activityCheckInterval) {
          console.log(`Activity detected: ${event} - resetting timer`);
          this.resetTimer();
        }
      }, true);
    });

    console.log('Activity listeners setup for session timeout (click, keypress, scroll only)');
  }

  /**
   * Set session expired flag in sessionStorage
   */
  private setSessionExpiredFlag(): void {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.setItem(this.SESSION_EXPIRED_FLAG, 'true');
    }
  }

  /**
   * Clear session expired flag
   */
  clearSessionExpiredFlag(): void {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.removeItem(this.SESSION_EXPIRED_FLAG);
    }
  }

  /**
   * Check if session was expired
   */
  wasSessionExpired(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return sessionStorage.getItem(this.SESSION_EXPIRED_FLAG) === 'true';
    }
    return false;
  }

  /**
   * Dismiss session warning
   */
  dismissWarning(): void {
    this.sessionWarningSubject.next(false);
  }

  /**
   * Navigate to login page after session expiration
   */
  navigateToLogin(): void {
    this.router.navigate(['/login'], { 
      queryParams: { reason: 'session-timeout' } 
    });
  }
}