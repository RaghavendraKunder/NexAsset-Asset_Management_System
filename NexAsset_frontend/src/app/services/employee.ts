import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface EmployeeRequest {
  name: string;
  email: string;
  department: string;
  jobTitle: string;
}

export interface EmployeeResponse {
  id: number;
  name: string;
  email: string;
  department: string;
  jobTitle: string;
  assignedAssets: number;
  assets: string[];
  createdAt: string;
  updatedAt: string;

  // Frontend-only properties
  initials?: string;
  avatarClass?: string;
}

@Injectable({
  providedIn: 'root'
})
export class Employee {

  private readonly API_URL = 'http://localhost:9091/api/employees';

  constructor(private http: HttpClient) {}

  getAllEmployees(): Observable<EmployeeResponse[]> {
    return this.http.get<EmployeeResponse[]>(this.API_URL);
  }

  getEmployeeById(id: number): Observable<EmployeeResponse> {
    return this.http.get<EmployeeResponse>(
      `${this.API_URL}/${id}`
    );
  }

  createEmployee(employee: EmployeeRequest): Observable<EmployeeResponse> {
    return this.http.post<EmployeeResponse>(
      this.API_URL,
      employee
    );
  }

  updateEmployee(
    id: number,
    employee: EmployeeRequest
  ): Observable<EmployeeResponse> {
    return this.http.put<EmployeeResponse>(
      `${this.API_URL}/${id}`,
      employee
    );
  }

  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.API_URL}/${id}`
    );
  }
}