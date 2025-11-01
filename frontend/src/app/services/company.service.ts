﻿import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { COMPANY_ENDPOINTS } from '../constants/api-endpoints.constants';

export interface CreateCompanyDTO {
  customerCode: string;
  customerName: string;
  customerAddress?: string;
  currency: string;
}

export interface CompanyListDTO {
  id: number;
  customerCode: string;
  customerName: string;
  customerAddress?: string;
  currency: string;
  createdDate: string;
  isActive: boolean;
}

export interface ApiResponse<T = any> {
  id?: number;
  message?: string;
  data?: T;
}

export interface BulkImportResponse {
  success: boolean;
  message: string;
  totalRecords: number;
  successfulRecords: number;
  failedRecords: number;
  errors?: string[];
}

export interface Company {
  id: number;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private readonly http = inject(HttpClient);
  private readonly authService = inject(AuthService);

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  submitCompany(company: CreateCompanyDTO): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(COMPANY_ENDPOINTS.CREATE, company, {
      headers: this.getHeaders()
    }).pipe(
      catchError(error => {
        console.error('Error creating company:', error);
        return throwError(() => error);
      })
    );
  }

  getCompanies(): Observable<CompanyListDTO[]> {
    return this.http.get<CompanyListDTO[]>(COMPANY_ENDPOINTS.GET_ALL, {
      headers: this.getHeaders()
    }).pipe(
      catchError(error => {
        console.error('Error fetching companies:', error);
        return throwError(() => error);
      })
    );
  }

  bulkImportCompanies(companies: CreateCompanyDTO[]): Observable<BulkImportResponse> {
    return this.http.post<BulkImportResponse>(COMPANY_ENDPOINTS.BULK_IMPORT, companies, {
      headers: this.getHeaders()
    }).pipe(
      catchError(error => {
        console.error('Error bulk importing companies:', error);
        return throwError(() => error);
      })
    );
  }

  exportCompanies(): Observable<CompanyListDTO[]> {
    return this.getCompanies();
  }

  submitCompanyLegacy(company: Company): Observable<ApiResponse> {
    const createDto: CreateCompanyDTO = {
      customerCode: company.id.toString(),
      customerName: company.name,
      customerAddress: '',
      currency: 'USD'
    };
    return this.submitCompany(createDto);
  }
}
