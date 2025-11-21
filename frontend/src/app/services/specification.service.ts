import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG, SPECIFICATION_ENDPOINTS } from '../constants/api-endpoints.constants';

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
        updateSpecification(id: number, payload: any) {
          // Ensure specificationId is included in the payload
          const fullPayload = { ...payload, SpecificationId: id };
          return this.http.put<any>(`${SPECIFICATION_ENDPOINTS.BASE}/UpdateSpecification?specificationid=${id}`, fullPayload, { headers: API_CONFIG.DEFAULT_HEADERS });
        }
      getSpecificationById(id: number) {
        return this.http.get<any>(`${SPECIFICATION_ENDPOINTS.BASE}/${id}`, { headers: API_CONFIG.DEFAULT_HEADERS });
      }
    deleteSpecification(specificationId: number, userId: number) {
      return this.http.delete(`${SPECIFICATION_ENDPOINTS.BASE}/DeleteSpecification?specificationid=${specificationId}&userId=${userId}`, { headers: API_CONFIG.DEFAULT_HEADERS });
    }
  private readonly apiUrl = SPECIFICATION_ENDPOINTS.BASE;

  constructor(private http: HttpClient) {}

  addSpecification(payload: AddSpecificationPayload) {
    return this.http.post<{ SpecificationId: number }>(
      this.apiUrl,
      payload,
      { headers: API_CONFIG.DEFAULT_HEADERS }
    );
  }

  getAllSpecifications() {
    return this.http.get<any[]>(SPECIFICATION_ENDPOINTS.GET_ALL, { headers: API_CONFIG.DEFAULT_HEADERS });
  }

  bulkImportSpecifications(payload: any[]) {
    return this.http.post<any>(`${this.apiUrl}/bulk-import`, payload, { headers: API_CONFIG.DEFAULT_HEADERS });
  }
}
