import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Consts } from '../../../utils/Constants';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { jwtDecode, JwtPayload } from 'jwt-decode';

export type NewUserForm = {
  name: string;
  'last name': string;
  'id number': string;
  'phone number': string;
  'birth date': string;
  email: string;
  password: string;
};

export type AuxDepotRequest = {
  name: string;
  lastName: string;
  idNumber: string;
  number: string;
  birthDate: string;
  email: string;
  password: string;
};

export type LoginForm = {
  username: string;
  password: string;
};

interface LoginResponse {
  token: string;
}

interface TokenType extends JwtPayload {
  authorities: string;
  userId: string;
}

export type RoutesType = {
  [key: string]: string[];
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private roleSubject = new BehaviorSubject<string | null>(null);

  private baseURL = environment.USER_BASE_URL;
  private AuxDepotURL = this.baseURL + Consts.AUX_DEPOT_PATH;
  private loginURL = this.baseURL + Consts.LOGIN_PATH;
  private signupURL = this.baseURL + Consts.CLIENT_PATH;

  constructor(private http: HttpClient, private router: Router) {}

  createAuxDepot(entity: NewUserForm): Observable<unknown> {
    return this.http.post(this.AuxDepotURL, this.formatNewUser(entity));
  }

  signup(entity: NewUserForm): Observable<unknown> {
    return this.http.post(this.signupURL, this.formatNewUser(entity)).pipe(
      tap({
        next: (_) => {
          this.handleSuccessSignup();
        },
      })
    );
  }

  login(entity: LoginForm): Observable<unknown> {
    const encodedCredentials = this.buildEncodedCredentials(entity);

    return this.http
      .get<LoginResponse>(this.loginURL, {
        headers: {
          Authorization: `Basic ${encodedCredentials}`,
        },
      })
      .pipe(
        tap({
          next: (res) => {
            const token = res.token;
            if (token) {
              this.handleSuccessfulLogin(token);
            }
          },
        })
      );
  }

  logout() {
    localStorage.removeItem(Consts.TOKEN);
    this.setRoleSubToNullAtLogout();

    this.router.navigate([Consts.AUTH_LOGIN_PATH]);
  }

  setRoleSubToNullAtLogout() {
    this.roleSubject.next(null);
  }

  getRoleValue() {
    console.log(this.roleSubject, 'rolesub val');

    return this.roleSubject.value ?? this.getRoleFromToken();
  }

  getTokenFromStorage() {
    return localStorage.getItem(Consts.TOKEN);
  }

  private handleSuccessSignup() {
    this.navigateToLogin();
  }

  private getRoleFromToken() {
    const token = this.getTokenFromStorage();

    if (token) {
      this.processToken(token);
      return this.roleSubject.value;
    }

    return null;
  }

  private handleSuccessfulLogin(token: string) {
    localStorage.setItem(Consts.TOKEN, token);
    this.handleRedirectionAccordingToRole(token);
  }

  handleRedirectionAccordingToRole(token: string) {
    this.processToken(token);

    const role = this.getRoleValue();
    if (role && role in this.routes) {
      this.router.navigate(this.routes[role]);
      return;
    }

    this.navigateToLogin();
  }

  private navigateToLogin() {
    this.router.navigate([Consts.AUTH_LOGIN_PATH]);
  }

  routes: RoutesType = {
    [Consts.AUX_DEPOT]: [Consts.DASHBOARD_ARTICLE_PATH],
    admin: [Consts.CREATE_ARTICLE_PATH],
    client: [Consts.HOME_PATH],
  };

  private processToken(token: string) {
    const { authorities } = jwtDecode<TokenType>(token);
    this.setRole(authorities);
  }

  private setRole(authorities: string) {
    const role = authorities
      .split(Consts.ROLE)
      [Consts.ONE].replace('_', '-')
      .toLowerCase();
    this.roleSubject.next(role);
  }

  private buildEncodedCredentials(entity: LoginForm): string {
    const { username, password } = entity;
    return btoa(`${username}:${password}`);
  }

  private formatNewUser(entity: NewUserForm): AuxDepotRequest {
    const {
      name,
      'last name': lastName,
      'id number': idNumber,
      'phone number': number,
      'birth date': birthDate,
      email,
      password,
    } = entity;
    return {
      name,
      lastName,
      idNumber,
      number,
      birthDate,
      email,
      password,
    };
  }
}
