import { Injectable } from '@angular/core';
import { API_BASE_URL } from '../constants/api-endpoints.constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class KeyValuesService {
  private readonly baseUrl = `${API_BASE_URL}/keyvalues`;

  constructor(private http: HttpClient) {}

  getAllContainerIds(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/container-ids`);
  }

  getAllItemIds(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/item-ids`);
  }
}
