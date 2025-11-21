import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BRANCH_ENDPOINTS } from '../constants/api-endpoints.constants';

export interface BranchDTO {
  id: number;
  branchName: string;
  branchCode: string;
  isActive: boolean;
  companyId?: number;
}

@Injectable({ providedIn: 'root' })
export class BranchService {
  constructor(private http: HttpClient) {}

  getBranches(): Observable<BranchDTO[]> {
    return this.http.get<BranchDTO[]>(BRANCH_ENDPOINTS.GET_ALL).pipe(
      catchError(error => {
        console.error('Error fetching branches:', error);
        return throwError(() => error);
      })
    );
  }
}
