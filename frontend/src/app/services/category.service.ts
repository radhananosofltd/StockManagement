import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG, CATEGORY_ENDPOINTS } from '../constants/api-endpoints.constants';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../constants/api-endpoints.constants';

export interface CategorySpecificationRequest {
  specificationId: number;
  skuOrder: number;
}

export interface SaveCategoryRequest {
  categoryName: string;
  isActive: boolean;
  specifications: CategorySpecificationRequest[];
  userId: number;
}

@Injectable({ providedIn: 'root' })
export class CategoryService {
    deleteCategory(categoryId: number, userId: number): Observable<any> {
      return this.http.delete(`${this.apiUrl}/DeleteCategory?categoryId=${categoryId}&userId=${userId}`, { headers: API_CONFIG.DEFAULT_HEADERS });
    }
  private readonly apiUrl = `${API_BASE_URL}/category`;

  constructor(private http: HttpClient) {}

  saveCategory(request: SaveCategoryRequest): Observable<{ CategoryId: number }> {
    return this.http.post<{ CategoryId: number }>(
      CATEGORY_ENDPOINTS.SAVE,
      request,
      { headers: API_CONFIG.DEFAULT_HEADERS }
    );
  }

  getAllCategories(): Observable<any[]> {
  return this.http.get<any[]>(CATEGORY_ENDPOINTS.GET_ALL, { headers: API_CONFIG.DEFAULT_HEADERS });
  }
}
