import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable, tap } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private httpClient = inject(HttpClient);
  private apiUrl = environment.apiUrl;
  private bearerToken = signal<string | null>(null);

  /**
   *
   */
  get getBearerToken(): string | null {
    return this.bearerToken();
  }

  /**
   *
   */
  set setBearerToken(token: string) {
    this.bearerToken.set(token);
  }

  /**
   *
   */
  resetToken(): void {
    this.bearerToken.set(null);
  }

  /**
   *
   */
  logout(): Observable<undefined> {
    return this.httpClient.post<undefined>(
      `${this.apiUrl}/auth/logout`,
      {},
      { withCredentials: true },
    );
  }

  /**
   *
   * @param email
   * @param password
   */
  loginUser(email: string, password: string): Observable<{ token: string }> {
    return this.httpClient
      .post<{
        token: string;
      }>(
        `${this.apiUrl}/auth/login`,
        { email, password },
        { withCredentials: true },
      )
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

  refreshToken(): Observable<{ token: string }> {
    return this.httpClient.post<{ token: string }>(
      `${this.apiUrl}/auth/refresh`,
      {},
      { withCredentials: true },
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
      { withCredentials: true },
    );
  }
}
