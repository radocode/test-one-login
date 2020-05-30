import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Credentials, CredentialsService } from './credentials.service';
import { tap, map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

const routes = {
  login: () => `/login`,
};

export interface LoginContext {
  email: string;
  password: string;
  remember?: boolean;
}

/**
 * Provides a base for authentication workflow.
 * The login/logout methods should be replaced with proper implementation.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private credentialsService: CredentialsService, private httpClient: HttpClient) {}

  /**
   * Authenticates the user.
   * @param context The login parameters.
   * @return The user credentials.
   */
  login(context: LoginContext): Observable<Credentials> {
    // Replace by proper authentication call
    // const data = {
    //   username: context.username,
    //   token: '123456',
    // };

    return this.httpClient.post(routes.login(), context).pipe(
      map((body: any) => body),
      tap((data) => this.credentialsService.setCredentials(data, context.remember)),
      catchError(() => of('Error, could not login'))
    );

    // return of(data);
  }

  /**
   * Logs out the user and clear credentials.
   * @return True if the user was logged out successfully.
   */
  logout(): Observable<boolean> {
    // Customize credentials invalidation here
    this.credentialsService.setCredentials();
    return of(true);
  }
}
