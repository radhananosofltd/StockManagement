import { Injectable, inject } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { COMPANY_ENDPOINTS, buildApiUrl } from '../constants/api-endpoints.constants';
import { isMockDataEnabled } from '../constants/environment.constants';
import { HttpService } from './http.service';

// Company model interface
export interface Company {
  id: number;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CompanyApiResponse {
  success: boolean;
  message: string;
  data?: Company;
}

export interface CompanyListResponse {
  success: boolean;
  message: string;
  data: Company[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface CompanySearchParams {
  search?: string;
  limit?: number;
  page?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private readonly httpService = inject(HttpService);

  /**
   * Submit a new company to the API
   */
  submitCompany(company: Company): Observable<CompanyApiResponse> {
    if (isMockDataEnabled()) {
      return this.mockSubmitCompany(company);
    }

    return this.httpService.post<CompanyApiResponse>(
      COMPANY_ENDPOINTS.CREATE,
      company
    );
  }

  /**
   * Get all companies
   */
  getCompanies(params?: CompanySearchParams): Observable<CompanyListResponse> {
    if (isMockDataEnabled()) {
      return this.mockGetCompanies(params);
    }

    const url = buildApiUrl(COMPANY_ENDPOINTS.GET_ALL, params);
    return this.httpService.get<CompanyListResponse>(url);
  }

  /**
   * Get a company by ID
   */
  getCompanyById(id: number): Observable<Company> {
    if (isMockDataEnabled()) {
      return this.mockGetCompanyById(id);
    }

    return this.httpService.get<Company>(
      COMPANY_ENDPOINTS.GET_BY_ID(id)
    );
  }

  /**
   * Update a company
   */
  updateCompany(id: number, company: Partial<Company>): Observable<CompanyApiResponse> {
    if (isMockDataEnabled()) {
      return this.mockUpdateCompany(id, company);
    }

    return this.httpService.put<CompanyApiResponse>(
      COMPANY_ENDPOINTS.UPDATE(id),
      company
    );
  }

  /**
   * Delete a company
   */
  deleteCompany(id: number): Observable<CompanyApiResponse> {
    if (isMockDataEnabled()) {
      return this.mockDeleteCompany(id);
    }

    return this.httpService.delete<CompanyApiResponse>(
      COMPANY_ENDPOINTS.DELETE(id)
    );
  }

  /**
   * Search companies
   */
  searchCompanies(searchTerm: string, params?: CompanySearchParams): Observable<CompanyListResponse> {
    if (isMockDataEnabled()) {
      return this.mockSearchCompanies(searchTerm, params);
    }

    const searchParams = { ...params, search: searchTerm };
    const url = buildApiUrl(COMPANY_ENDPOINTS.SEARCH, searchParams);
    return this.httpService.get<CompanyListResponse>(url);
  }

  /**
   * Bulk create companies
   */
  bulkCreateCompanies(companies: Company[]): Observable<CompanyApiResponse> {
    if (isMockDataEnabled()) {
      return this.mockBulkCreateCompanies(companies);
    }

    return this.httpService.post<CompanyApiResponse>(
      COMPANY_ENDPOINTS.BULK_CREATE,
      { companies }
    );
  }

  /**
   * Export companies data
   */
  exportCompanies(format: 'csv' | 'excel' | 'pdf' = 'csv'): Observable<Blob> {
    if (isMockDataEnabled()) {
      return this.mockExportCompanies(format);
    }

    const url = buildApiUrl(COMPANY_ENDPOINTS.EXPORT, { format });
    return this.httpService.downloadFile(url);
  }

  // Mock implementations for development/testing
  private mockSubmitCompany(company: Company): Observable<CompanyApiResponse> {
    console.log('Mock: Submitting company data:', company);
    
    return new Observable(observer => {
      setTimeout(() => {
        const response: CompanyApiResponse = {
          success: true,
          message: `Company ${company.name} (${company.id}) has been successfully added to the system.`,
          data: {
            ...company,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
        };
        observer.next(response);
        observer.complete();
      }, 2000);
    });
  }

  private mockGetCompanies(params?: CompanySearchParams): Observable<CompanyListResponse> {
    console.log('Mock: Getting companies with params:', params);
    
    return new Observable(observer => {
      setTimeout(() => {
        const mockCompanies: Company[] = [
          { id: 1, name: 'Apple Inc.', createdAt: '2024-01-15T10:30:00Z', updatedAt: '2024-01-15T10:30:00Z' },
          { id: 2, name: 'Microsoft Corporation', createdAt: '2024-01-16T14:20:00Z', updatedAt: '2024-01-16T14:20:00Z' },
          { id: 3, name: 'Google LLC', createdAt: '2024-01-17T09:45:00Z', updatedAt: '2024-01-17T09:45:00Z' },
          { id: 4, name: 'Amazon.com Inc.', createdAt: '2024-01-18T16:10:00Z', updatedAt: '2024-01-18T16:10:00Z' },
          { id: 5, name: 'Tesla Inc.', createdAt: '2024-01-19T11:25:00Z', updatedAt: '2024-01-19T11:25:00Z' }
        ];

        const response: CompanyListResponse = {
          success: true,
          message: 'Companies retrieved successfully',
          data: mockCompanies,
          pagination: {
            page: params?.page || 1,
            limit: params?.limit || 10,
            total: mockCompanies.length,
            totalPages: Math.ceil(mockCompanies.length / (params?.limit || 10))
          }
        };
        observer.next(response);
        observer.complete();
      }, 1000);
    });
  }

  private mockGetCompanyById(id: number): Observable<Company> {
    console.log('Mock: Getting company by ID:', id);
    
    return new Observable(observer => {
      setTimeout(() => {
        const company: Company = {
          id,
          name: `Company ${id}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        observer.next(company);
        observer.complete();
      }, 500);
    });
  }

  private mockUpdateCompany(id: number, company: Partial<Company>): Observable<CompanyApiResponse> {
    console.log('Mock: Updating company:', id, company);
    
    return new Observable(observer => {
      setTimeout(() => {
        const response: CompanyApiResponse = {
          success: true,
          message: `Company ${id} has been successfully updated.`,
          data: {
            id,
            name: company.name || `Updated Company ${id}`,
            createdAt: '2024-01-15T10:30:00Z',
            updatedAt: new Date().toISOString()
          }
        };
        observer.next(response);
        observer.complete();
      }, 1500);
    });
  }

  private mockDeleteCompany(id: number): Observable<CompanyApiResponse> {
    console.log('Mock: Deleting company:', id);
    
    return new Observable(observer => {
      setTimeout(() => {
        const response: CompanyApiResponse = {
          success: true,
          message: `Company ${id} has been successfully deleted.`
        };
        observer.next(response);
        observer.complete();
      }, 1000);
    });
  }

  private mockSearchCompanies(searchTerm: string, params?: CompanySearchParams): Observable<CompanyListResponse> {
    console.log('Mock: Searching companies for:', searchTerm, params);
    
    return new Observable(observer => {
      setTimeout(() => {
        const mockResults: Company[] = [
          { id: 1, name: `${searchTerm} Corp`, createdAt: '2024-01-15T10:30:00Z', updatedAt: '2024-01-15T10:30:00Z' },
          { id: 2, name: `${searchTerm} Industries`, createdAt: '2024-01-16T14:20:00Z', updatedAt: '2024-01-16T14:20:00Z' }
        ];

        const response: CompanyListResponse = {
          success: true,
          message: `Found ${mockResults.length} companies matching "${searchTerm}"`,
          data: mockResults,
          pagination: {
            page: params?.page || 1,
            limit: params?.limit || 10,
            total: mockResults.length,
            totalPages: 1
          }
        };
        observer.next(response);
        observer.complete();
      }, 800);
    });
  }

  private mockBulkCreateCompanies(companies: Company[]): Observable<CompanyApiResponse> {
    console.log('Mock: Bulk creating companies:', companies);
    
    return new Observable(observer => {
      setTimeout(() => {
        const response: CompanyApiResponse = {
          success: true,
          message: `Successfully created ${companies.length} companies.`
        };
        observer.next(response);
        observer.complete();
      }, 3000);
    });
  }

  private mockExportCompanies(format: string): Observable<Blob> {
    console.log('Mock: Exporting companies in format:', format);
    
    return new Observable(observer => {
      setTimeout(() => {
        const mockData = 'Company ID,Company Name\n1,Apple Inc.\n2,Microsoft Corporation\n3,Google LLC';
        const blob = new Blob([mockData], { type: 'text/csv' });
        observer.next(blob);
        observer.complete();
      }, 2000);
    });
  }
}