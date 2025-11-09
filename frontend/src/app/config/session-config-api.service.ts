import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SessionConfig, SessionConfigService } from './session-config.service';
import { environment } from '../constants/environment.constants';

export interface BackendSessionConfig {
  timeoutMinutes: number;
  warningMinutes: number;
}

@Injectable({
  providedIn: 'root'
})
export class SessionConfigApiService {
  private readonly apiUrl = `${environment.apiBaseUrl}/api`; // Use environment configuration

  constructor(
    private http: HttpClient,
    private sessionConfigService: SessionConfigService
  ) {}

  /**
   * Fetch session configuration from backend
   */
  fetchSessionConfig(): Observable<BackendSessionConfig> {
    return this.http.get<BackendSessionConfig>(`${this.apiUrl}/SessionConfig`);
  }

  /**
   * Initialize session configuration from backend
   */
  async initializeSessionConfig(): Promise<void> {
    try {
      const backendConfig = await this.fetchSessionConfig().toPromise();
      if (backendConfig) {
        this.sessionConfigService.updateFromBackendResponse({
          timeoutMinutes: backendConfig.timeoutMinutes,
          warningMinutes: backendConfig.warningMinutes
        });
      }
    } catch (error) {
      console.warn('Failed to fetch session config from backend, using defaults:', error);
    }
  }
}