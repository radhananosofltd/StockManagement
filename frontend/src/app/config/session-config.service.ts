import { Injectable } from '@angular/core';
import { environment } from '../constants/environment.constants';

export interface SessionConfig {
  timeoutMinutes: number;
  warningMinutes: number;
  activityCheckInterval: number; // in milliseconds
}

// Configuration is now managed entirely through environment.constants.ts
@Injectable({
  providedIn: 'root'
})
export class SessionConfigService {
  private config: SessionConfig;

  constructor() {
    // Initialize with environment configuration (single source of truth)
    this.config = { ...environment.sessionConfig };
  }

  setConfig(config: Partial<SessionConfig>): void {
    this.config = { ...this.config, ...config };
  }

  getConfig(): SessionConfig {
    return this.config;
  }

  getTimeoutMs(): number {
    return this.config.timeoutMinutes * 60 * 1000;
  }

  getWarningMs(): number {
    return this.config.warningMinutes * 60 * 1000;
  }

  getActivityCheckInterval(): number {
    return this.config.activityCheckInterval;
  }

  /**
   * Load configuration from backend API
   * Falls back to environment configuration if backend is unavailable
   */
  async loadConfigFromBackend(): Promise<void> {
    try {
      // This would typically be an HTTP call to your backend
      // For now, we'll keep the environment configuration
      console.log('Session config loaded from environment:', this.config);
    } catch (error) {
      console.warn('Failed to load session config from backend, using environment config:', error);
      // Reset to environment config as fallback
      this.config = { ...environment.sessionConfig };
    }
  }

  /**
   * Update configuration with values from backend response
   */
  updateFromBackendResponse(backendConfig: Partial<SessionConfig>): void {
    this.setConfig(backendConfig);
    console.log('Session config updated from backend:', this.config);
  }
}