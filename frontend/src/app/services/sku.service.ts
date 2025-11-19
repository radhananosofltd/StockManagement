import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { API_BASE_URL, API_CONFIG, SKU_ENDPOINTS } from '../constants/api-endpoints.constants';
import { BulkImportResponse } from '../models/bulk-import-response.model';

export interface SaveSkuRequestDTO {
  specificationId: number;
  value: string;
  skuCode: string;
  isActive: boolean;
  userId: number;
}

@Injectable({ providedIn: 'root' })
export class SkuService {
    deactivateSku(payload: { skuId: number; userId: number }): Observable<any> {
      return this.http.post<any>(SKU_ENDPOINTS.DEACTIVATE, payload, { headers: API_CONFIG.DEFAULT_HEADERS });
    }
  private readonly apiUrl = `${API_BASE_URL}/sku`;

  constructor(private http: HttpClient) {}

  saveSku(payload: SaveSkuRequestDTO): Observable<any> {
    return this.http.post<any>(this.apiUrl, payload, { headers: API_CONFIG.DEFAULT_HEADERS });
  }

  getAllSkus(): Observable<any[]> {
    return this.http.get<any[]>(SKU_ENDPOINTS.GET_ALL, { headers: API_CONFIG.DEFAULT_HEADERS });
  }

  bulkImportSkus(companies: SaveSkuRequestDTO[]): Observable<BulkImportResponse> {
    return this.http.post<BulkImportResponse>(SKU_ENDPOINTS.BULK_IMPORT, companies, {
      headers: API_CONFIG.DEFAULT_HEADERS
    }).pipe(
      catchError(error => {
        console.error('Error bulk importing companies:', error);
        return throwError(() => error);
      })
    );
  }

  updateSku(payload: any): Observable<any> {
    return this.http.post<any>(SKU_ENDPOINTS.UPDATE, payload, { headers: API_CONFIG.DEFAULT_HEADERS });
  }
}
