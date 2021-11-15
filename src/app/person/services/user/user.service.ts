import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Endpoints } from '../endpoint';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService
  ) {}

  /**
   * Signup
   */
  signup(param: {}): Observable<any> {
    return this.httpClient
      .post(Endpoints.user, param)
      .pipe(map((response: any) => response));
  }

  /**
   * Signin
   */
  signin(param: {}): Observable<any> {
    return this.httpClient.post(Endpoints.signin, param).pipe(
      map((response: any) => {
        this._setUserCookie(response);
        return response;
      })
    );
  }

  /**
   * Signout
   */
  signout(): any {
    return this._deleteUserCookie();
  }

  /**
   * Get current user from cookie
   */
  getCurrentUser(): any {
    return this._getUserCookie();
  }

  /**
   * Update profile
   */
  updateProfile(hexid: string, param: {}): Observable<any> {
    return this.httpClient
      .patch(Endpoints.user + hexid + '/profile/', param)
      .pipe(map((response: any) => response));
  }

  /**
   * Update user
   */
  updateUser(hexid: string, param: {}): Observable<any> {
    return this.httpClient.patch(Endpoints.user + hexid + '/', param).pipe(
      map((response: any) => {
        // combine current user cookie with new data
        let oldData = this._getUserCookie();
        let newData = {
          ...oldData,
          user: {
            ...response,
          },
        };

        this._setUserCookie(newData);
        return response;
      })
    );
  }

  /**
   * Retrieve user
   */
  retrieveUser(hexid: string): Observable<any> {
    return this.httpClient.get(Endpoints.user + hexid + '/').pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  /**
   * Change password
   */
  changePassword(hexid: string, param: {}): Observable<any> {
    return this.httpClient
      .post(Endpoints.user + hexid + '/change-password/', param)
      .pipe(map((response: any) => response));
  }

  private _setUserCookie(user: any): void {
    this.cookieService.set('user', JSON.stringify(user));
  }

  private _getUserCookie() {
    const user = this.cookieService.get('user');
    return user ? JSON.parse(user) : {};
  }

  private _deleteUserCookie() {
    this.cookieService.delete('user');
  }

  get token() {
    return this._getUserCookie()?.token;
  }

  get isLoggedin(): boolean {
    if (this.token?.access) return true;
    return false;
  }
}
