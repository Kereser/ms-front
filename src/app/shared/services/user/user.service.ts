import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IDynamicFormEntity } from '../IDynamicFormEntity';
import { Observable, tap } from 'rxjs';
import { Consts } from '../../../utils/Constants';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';

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

@Injectable({
  providedIn: 'root',
})
export class UserService implements IDynamicFormEntity {
  private baseURL = environment.USER_BASE_URL;
  private AuxDepotURL = this.baseURL + Consts.AUX_DEPOT_PATH;
  private loginURL = this.baseURL + Consts.LOGIN_URL;
  private signupURL = this.baseURL + Consts.CLIENT_URL;

  constructor(private http: HttpClient, private router: Router) {}

  createAuxDepot(entity: NewUserForm): Observable<unknown> {
    return this.http.post(this.AuxDepotURL, this.formatNewUser(entity));
  }

  signup(entity: NewUserForm): Observable<unknown> {
    return this.http.post(this.signupURL, this.formatNewUser(entity));
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
              localStorage.setItem(Consts.TOKEN, token);
              this.router.navigate([Consts.DASHBOARD_CATEGORY_PATH]);
            }
          },
        })
      );
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
