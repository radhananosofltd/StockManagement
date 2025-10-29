import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { API_CONFIG } from '../constants/api-endpoints.constants';
import { isLoggingEnabled } from '../constants/environment.constants';

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  timestamp?: string;
}

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private readonly http = inject(HttpClient);

  // Default HTTP options
  private readonly defaultHeaders = new HttpHeaders(API_CONFIG.DEFAULT_HEADERS);

  /**
   * Perform GET request
   */
  get<T>(url: string, options?: { headers?: HttpHeaders; params?: HttpParams }): Observable<T> {
    const httpOptions = {
      headers: options?.headers || this.defaultHeaders,
      params: options?.params
    };
    
    if (isLoggingEnabled()) {
      console.log(`HTTP GET: ${url}`, httpOptions);
    }

    return this.http.get<T>(url, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Perform POST request
   */
  post<T>(url: string, data?: any, options?: { headers?: HttpHeaders; params?: HttpParams }): Observable<T> {
    const httpOptions = {
      headers: options?.headers || this.defaultHeaders,
      params: options?.params
    };
    
    if (isLoggingEnabled()) {
      console.log(`HTTP POST: ${url}`, data, httpOptions);
    }

    return this.http.post<T>(url, data, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Perform PUT request
   */
  put<T>(url: string, data?: any, options?: { headers?: HttpHeaders; params?: HttpParams }): Observable<T> {
    const httpOptions = {
      headers: options?.headers || this.defaultHeaders,
      params: options?.params
    };
    
    if (isLoggingEnabled()) {
      console.log(`HTTP PUT: ${url}`, data, httpOptions);
    }

    return this.http.put<T>(url, data, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Perform DELETE request
   */
  delete<T>(url: string, options?: { headers?: HttpHeaders; params?: HttpParams }): Observable<T> {
    const httpOptions = {
      headers: options?.headers || this.defaultHeaders,
      params: options?.params
    };
    
    if (isLoggingEnabled()) {
      console.log(`HTTP DELETE: ${url}`, httpOptions);
    }

    return this.http.delete<T>(url, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Download file
   */
  downloadFile(url: string): Observable<Blob> {
    if (isLoggingEnabled()) {
      console.log(`HTTP DOWNLOAD: ${url}`);
    }

    return this.http.get(url, { responseType: 'blob' }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Handle HTTP errors
   */
  private handleError = (error: HttpErrorResponse): Observable<never> => {
    let errorMessage = '';
    let errorData = null;

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Client Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Server Error: ${error.status} - ${error.statusText}`;
      errorData = error.error;
    }

    if (isLoggingEnabled()) {
      console.error('HTTP Error:', error);
      console.error('Error Message:', errorMessage);
      console.error('Error Data:', errorData);
    }

    // Return a user-friendly error
    const apiError: ApiResponse = {
      success: false,
      message: errorMessage,
      error: errorData?.message || errorData || 'An unexpected error occurred',
      timestamp: new Date().toISOString()
    };

    return throwError(() => apiError);
  };
}