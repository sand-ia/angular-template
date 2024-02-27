import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import {
  User,
  AppUser,
  Credentials,
  LoginResponse,
  Payload,
  CreateAccountRequest,
  Country,
  State,
  City,
  UpdatePasswordRequest,
} from './authentication.service.types';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private _user: User | null = null;
  private _token: string | null = null;

  constructor(private http: HttpClient) {}

  getToken(): string | null {
    if (this._token) return this._token;
    this._token = sessionStorage.getItem('token');
    return this._token;
  }

  getUser(): User | null {
    if (this._user) return this._user;
    const userJsonString = sessionStorage.getItem('user');
    this._user = userJsonString ? JSON.parse(userJsonString) : {};
    return this._user;
  }

  getUserbyId(idUser: number): Observable<AppUser> {
    const urlEndpoint = environment.url + '/engine/users/' + idUser.toString();
    return this.http.get<AppUser>(urlEndpoint);
  }

  getUsers(): Observable<AppUser[]> {
    const urlEndpoint = environment.url + '/engine/users/';
    return this.http.get<AppUser[]>(urlEndpoint);
  }

  login(credentials: Credentials): Observable<void> {
    const urlEndpoint = environment.url + '/security/oauth/token';

    const credenciales = btoa('angularapp' + ':' + 'CF1p1092$#');

    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + credenciales,
    });

    const params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', credentials.email);
    params.set('password', credentials.password);

    return this.http
      .post<LoginResponse>(urlEndpoint, params.toString(), {
        headers: httpHeaders,
      })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(() => error);
        }),
        map((response: LoginResponse): void => {
          const accessToken = response.access_token;
          this.saveTokenOnSessionStorage(accessToken);
          this.saveUserOnSessionStorage(accessToken);
        })
      );
  }

  createAccount(createAccountRequest: CreateAccountRequest): Observable<void> {
    const urlEndpoint = environment.url + '/engine/users';

    return this.http.post<void>(urlEndpoint, createAccountRequest);
  }

  sendValidationEmail(email: string): Observable<void> {
    const urlEndpoint = environment.url + '/engine/users/emails/' + email;

    return this.http.put<void>(urlEndpoint, '');
  }

  resetPassword(email: string): Observable<void> {
    const urlEndpoint =
      environment.url + '/engine/users/passwords/tokens/' + email;

    return this.http.get<void>(urlEndpoint);
  }

  updatePassword(
    updatePasswordRequest: UpdatePasswordRequest
  ): Observable<void> {
    const urlEndpoint = environment.url + '/engine/users/passwords';

    return this.http.put<void>(urlEndpoint, updatePasswordRequest);
  }

  checkEmailExists(email: string): Observable<boolean> {
    const urlEndpoint = environment.url + '/engine/users/emails/' + email;

    return this.http.get<any>(urlEndpoint).pipe(
      map(() => {
        return true;
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) return of(false);
        throw error;
      })
    );
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    const payload = this.decodeToken(token);
    return !!payload;
  }

  isTokenExpired(): boolean {
    const payload: Payload | null = this.decodeToken(this._token);
    const now = new Date().getTime() / 1000;
    const isTokenExpired = payload != null && payload.exp < now;
    return isTokenExpired;
  }

  logout(): void {
    this._token = null;
    this._user = null;
    sessionStorage.clear();
  }

  getCountries(): Observable<Country[]> {
    const urlEndpoint = environment.url + '/engine/countries';

    return this.http.get<Country[]>(urlEndpoint);
  }

  getStates(id: number): Observable<State[]> {
    const urlEndpoint = environment.url + '/engine/states/' + id;

    return this.http.get<State[]>(urlEndpoint);
  }

  getCities(id: number): Observable<City[]> {
    const urlEndpoint = environment.url + '/engine/cities/' + id;

    return this.http.get<City[]>(urlEndpoint);
  }

  private saveUserOnSessionStorage(accessToken: string | null): void {
    const payload: Payload | null = this.decodeToken(accessToken);
    if (payload === null) return;
    const user: User = {
      id: payload.id,
      name: payload.name,
      email: payload.email,
      roles: payload.authorities,
      userType: payload.user_type,
    };
    this._user = user;
    sessionStorage.setItem('user', JSON.stringify(this._user));
  }

  private saveTokenOnSessionStorage(accessToken: string | null): void {
    this._token = accessToken;
    if (accessToken != null) sessionStorage.setItem('token', accessToken);
  }

  private decodeToken(accessToken: string | null): Payload | null {
    if (accessToken === null) return null;
    const encodedPayload = accessToken.split('.')[1];
    const decodedPayload = atob(encodedPayload);
    const payload: Payload = JSON.parse(decodedPayload) as Payload;
    return payload;
  }
}
