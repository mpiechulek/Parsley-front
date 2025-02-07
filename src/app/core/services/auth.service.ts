import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';

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
  loginUser(email: string, password: string): void {
    this.httpClient
      .post(`${this.apiUrl}/api/login`, { email, password })
      .subscribe((res) => {
        this.isUserValid.set(true);
        console.log(res);
      });
  }

  /**
   *
   * @param email
   * @param password
   */
  signUpNewUser(email: string, password: string) {
    this.httpClient
      .post(`${this.apiUrl}/api/signup`, { email, password })
      .subscribe((res) => {
        console.log(res);
      });
  }
}
