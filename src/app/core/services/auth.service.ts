import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private httpClient = inject(HttpClient);
  public isUserValid = signal(false);
  private apiUrl = environment.apiUrl;

  /**
   *
   * @param email
   * @param password
   */
  loginUser(email: string, password: string): Observable<{ token: string }> {
    return this.httpClient.post<{token: string}>(`${this.apiUrl}/api/login`, { email, password });
  }

  /**
   *
   * @param email
   * @param password
   */
  signUpNewUser(email: string, password: string): Observable<{ token: string }> {
    return this.httpClient.post<{token: string}>(`${this.apiUrl}/api/signup`, { email, password });
  }
}
