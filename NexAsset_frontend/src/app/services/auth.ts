import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface LoginRequest {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface LoginResponse {
  token: string;
  tokenType: string;
  userId: number;
  name: string;
  email: string;
  role: string;
}

@Injectable({
  providedIn: 'root',
})
export class Auth {

  private readonly apiUrl = 'http://localhost:9091/api/auth';

  constructor(private http: HttpClient) {}


  // =========================================================
  // LOGIN
  // =========================================================

  login(loginData: LoginRequest): Observable<LoginResponse> {

    return this.http
      .post<LoginResponse>(
        `${this.apiUrl}/login`,
        loginData
      )
      .pipe(
        tap(response => {
          this.storeAuthentication(
            response,
            loginData.rememberMe
          );
        })
      );
  }


  // =========================================================
  // REGISTER
  // =========================================================

  register(registerData: any): Observable<LoginResponse> {

    return this.http.post<LoginResponse>(
      `${this.apiUrl}/register`,
      registerData
    );
  }


  // =========================================================
  // STORE AUTHENTICATION
  // =========================================================

  private storeAuthentication(
    response: LoginResponse,
    rememberMe: boolean
  ): void {

    const storage = rememberMe
      ? localStorage
      : sessionStorage;

    storage.setItem(
      'token',
      response.token
    );

    storage.setItem(
      'user',
      JSON.stringify({
        userId: response.userId,
        name: response.name,
        email: response.email,
        role: response.role
      })
    );
  }


  // =========================================================
  // GET TOKEN
  // =========================================================

  getToken(): string | null {

    return (
      localStorage.getItem('token') ||
      sessionStorage.getItem('token')
    );
  }


  // =========================================================
  // GET USER
  // =========================================================

  getUser(): any | null {

    const user =
      localStorage.getItem('user') ||
      sessionStorage.getItem('user');

    return user
      ? JSON.parse(user)
      : null;
  }


  // =========================================================
  // CHECK AUTHENTICATION
  // =========================================================

  isLoggedIn(): boolean {

    return this.getToken() !== null;
  }


  // =========================================================
  // LOGOUT
  // =========================================================

  logout(): void {

    localStorage.removeItem('token');
    localStorage.removeItem('user');

    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
  }
}