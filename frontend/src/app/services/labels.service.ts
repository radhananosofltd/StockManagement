import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../constants/api-endpoints.constants';

export interface GenerateLabelRequest {
  labelType: string;
  containerNumbers: number;
  itemNumbers: number;
  status: string;
  userId: number;
}

@Injectable({ providedIn: 'root' })
export class LabelsService {
  private readonly baseUrl = `${API_BASE_URL}/labels`;

  constructor(private http: HttpClient) {}

  generateLabels(request: GenerateLabelRequest): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/generate`, request);
  }

  downloadLabelsPdf(request: GenerateLabelRequest): Observable<Blob> {
    return this.http.post(`${this.baseUrl}/generate`, request, { responseType: 'blob' });
  }
}
