import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IDynamicFormEntity } from '../IDynamicFormEntity';
import { Observable } from 'rxjs';
import { Consts } from '../../../utils/Constants';
import { environment } from '../../../../environments/environment';

export type AuxDepotForm = {
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

@Injectable({
  providedIn: 'root',
})
export class UserService implements IDynamicFormEntity {
  private baseURL = environment.USER_BASE_URL + Consts.AUX_DEPOT_PATH;

  constructor(private http: HttpClient) {}

  createEntity(entity: AuxDepotForm): Observable<any> {
    return this.http.post(this.baseURL, this.getAuxDepotObj(entity));
  }

  private getAuxDepotObj(entity: AuxDepotForm): AuxDepotRequest {
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
