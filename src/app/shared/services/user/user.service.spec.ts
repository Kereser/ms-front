import { TestBed } from '@angular/core/testing';

import { AuxDepotForm, AuxDepotRequest, UserService } from './user.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Consts } from '../../../utils/Constants';
import { TypeMethods } from '../TypeMethods.enum';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService],
    });

    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create aux-depot', () => {
    const entity: AuxDepotForm = {
      name: Consts.NAME,
      'last name': Consts.NAME,
      'id number': Consts.ONE_HUNDRED_TWENTY.toString(),
      'phone number': '3001231212',
      'birth date': '2003-02-04',
      email: Consts.TEST_EMAIL,
      password: Consts.TYPE_PASSWORD,
    };

    service.createEntity(entity).subscribe((res) => expect(res).toBeTruthy());

    const req = httpMock.expectOne(service['baseURL']);
    expect(req.request.method).toBe(TypeMethods.POST);
    req.flush({});
  });

  it('should format body when sending the req', () => {
    const entity: AuxDepotForm = {
      name: Consts.NAME,
      'last name': Consts.NAME,
      'id number': Consts.ONE_HUNDRED_TWENTY.toString(),
      'phone number': '3001231212',
      'birth date': '2003-02-04',
      email: Consts.TEST_EMAIL,
      password: Consts.TYPE_PASSWORD,
    };

    const formattedEntity: AuxDepotRequest = {
      name: Consts.NAME,
      lastName: Consts.NAME,
      idNumber: Consts.ONE_HUNDRED_TWENTY.toString(),
      number: '3001231212',
      birthDate: '2003-02-04',
      email: Consts.TEST_EMAIL,
      password: Consts.TYPE_PASSWORD,
    };

    service.createEntity(entity).subscribe((res) => expect(res).toBeTruthy());

    const req = httpMock.expectOne(service['baseURL']);
    expect(req.request.method).toBe(TypeMethods.POST);
    expect(req.request.body).toEqual(formattedEntity);
    req.flush({});
  });
});
