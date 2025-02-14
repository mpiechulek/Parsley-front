import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable, tap } from 'rxjs';
import { GlobalStore } from 'app/state/global.state';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private httpClient = inject(HttpClient);
  private globalStore = inject(GlobalStore);
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
  logout(): void {
    // http request for logout to the
    // this.httpClient
      // .post<{ token: string }>(`${this.apiUrl}/auth/logout`, {})
      // .subscribe({
      //   next: () => {
      //     this.router.navigate(['/login']);
      //   },
      // });
    this.bearerToken.set(null);
    this.refreshToken.set(null);
    this.globalStore.clearState();
    this.router.navigate(['/login']);
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
