import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG, API_BASE_URL } from '../constants/api-endpoints.constants';

export interface AddSpecificationPayload {
  isDefault: boolean;
  specificationName: string;
  datatype: string;
  nameCase: string;
  valueCase: string;
  sku: boolean;
  editable: boolean;
  configurable: boolean;
  bulkInput: boolean;
  lockable: boolean;
  background: boolean;
  isActive: boolean;
}

@Injectable({ providedIn: 'root' })
export class SpecificationService {
  private readonly apiUrl = `${API_BASE_URL}/specification`;

  constructor(private http: HttpClient) {}

  addSpecification(payload: AddSpecificationPayload) {
    return this.http.post<{ SpecificationId: number }>(
      this.apiUrl,
      payload,
      { headers: API_CONFIG.DEFAULT_HEADERS }
    );
  }

  getAllSpecifications() {
    return this.http.get<any[]>(this.apiUrl, { headers: API_CONFIG.DEFAULT_HEADERS });
  }

  bulkImportSpecifications(payload: any[]) {
    return this.http.post<any>(`${this.apiUrl}/bulk-import`, payload, { headers: API_CONFIG.DEFAULT_HEADERS });
  }
}
