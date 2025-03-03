import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private httpClient = inject(HttpClient);
  private router = inject(Router);
  private apiUrl = environment.apiUrl;
  private bearerToken = signal<string | null>(null);
  public refreshToken = signal<string | null>(null);

  /**
   *
   */
  get getBearerToken(): string | null {
    return this.bearerToken();
  }

  /**
   *
   */
  resetTokens(): void {
    this.bearerToken.set(null);
    this.refreshToken.set(null);
  }
  /**
   *
   */
  logout(): Observable<undefined> {
    return this.httpClient.post<undefined>(`${this.apiUrl}/auth/logout`, {});
  }

  /**
   *
   * @param email
   * @param password
   */
  loginUser(email: string, password: string): Observable<{ token: string }> {
    return this.httpClient
      .post<{ token: string }>(`${this.apiUrl}/auth/login`, { email, password })
      .pipe(
        tap(({ token }) => {
          this.bearerToken.set(token);
        }),
      );
  }

  /**
   *
   * @param email
   * @param password
   */
  signUpNewUser(
    email: string,
    password: string,
  ): Observable<{ token: string }> {
    return this.httpClient.post<{ token: string }>(
      `${this.apiUrl}/auth/register`,
      { email, password },
    );
  }
}
