import { TestBed } from '@angular/core/testing';

import {
  NewUserForm,
  AuxDepotRequest,
  UserService,
  LoginForm,
} from './user.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Consts } from '@app/utils/Constants';
import { TypeMethods } from '../TypeMethods.enum';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;
  const auxDepotToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJMb2NhIVNlY3VyNGRVc19lciIsInN1YiI6ImVtYWlsLXRva2VuQGVtYWlsLmNvbSIsImF1dGhvcml0aWVzIjoiUk9MRV9BVVhfREVQT1QiLCJ1c2VySWQiOjMsImlhdCI6MTczMDI0OTEyNiwiZXhwIjoxNzMwMzM1NTI2LCJqdGkiOiI4NTVmZDRkOS1iNWMxLTRjOTEtODdiYi1kYThhNjAyNzRlYzgiLCJuYmYiOjE3MzAyNDkxMjZ9.A5B4opP9jTm_Tb4EEFElbUzpWoY9BgXhhT8WK7W2ajo';
  const adminToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJMb2NhIVNlY3VyNGRVc19lciIsInN1YiI6ImVtYWlsLWFkbWluQGVtYWlsLmNvbSIsImF1dGhvcml0aWVzIjoiUk9MRV9BRE1JTiIsInVzZXJJZCI6MiwiaWF0IjoxNzMwMjU5MTczLCJleHAiOjE3MzAzNDU1NzMsImp0aSI6ImJjYTM3Y2NiLTA2NjItNGU0NS1iYjg0LTFlYTVmZDVjNWYzNSIsIm5iZiI6MTczMDI1OTE3M30.kPemRa4n7mPFn-KFOUqZ_Z6JsahJ7_2_na7FdKR_9TM';

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
    const entity: NewUserForm = {
      name: Consts.NAME,
      'last name': Consts.NAME,
      'id number': Consts.ONE_HUNDRED_TWENTY.toString(),
      'phone number': '3001231212',
      'birth date': '2003-02-04',
      email: Consts.TEST_EMAIL,
      password: Consts.TYPE_PASSWORD,
    };

    service.createAuxDepot(entity).subscribe((res) => expect(res).toBeTruthy());

    const req = httpMock.expectOne(service['AuxDepotURL']);
    expect(req.request.method).toBe(TypeMethods.POST);
    req.flush({});
  });

  it('should signup user', () => {
    const dummyUser: NewUserForm = {
      name: 'Jane',
      'last name': 'Doe',
      'id number': '654321',
      'phone number': '0987654321',
      'birth date': '1992-02-02',
      email: 'jane.doe@example.com',
      password: 'password123',
    };

    service.signup(dummyUser).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(service['signupURL']);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  it('should login user', () => {
    const dummyLogin: LoginForm = { username: 'john', password: 'password123' };
    const dummyResponse = { token: 'dummyToken' };

    service.login(dummyLogin).subscribe((response) => {
      expect(response).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne(service['loginURL']);
    expect(req.request.method).toBe('GET');
    req.flush(dummyResponse);
  });

  it('should logout user', () => {
    jest.spyOn(service['router'], 'navigate');

    service.logout();

    expect(localStorage.getItem(Consts.TOKEN)).toBeNull();
    expect(service.getRoleValue()).toBeNull();
    expect(service['router'].navigate).toHaveBeenCalledWith([
      Consts.AUTH_LOGIN_PATH,
    ]);
  });

  it('should get token from storage', () => {
    const dummyToken = 'dummyToken';
    localStorage.setItem(Consts.TOKEN, dummyToken);

    const token = service.getTokenFromStorage();

    expect(token).toBe(dummyToken);
  });

  it('should process token and set role', () => {
    localStorage.setItem(Consts.TOKEN, adminToken);

    const roleVal = service['getRoleFromToken']();

    expect(roleVal).toBe(Consts.ADMIN);
  });

  it('should redirect user according to role', () => {
    service['processToken'](auxDepotToken);
    jest.spyOn(service, 'getRoleValue').mockReturnValue(Consts.AUX_DEPOT);
    jest.spyOn(service['router'], 'navigate');

    service['handleRedirectionAccordingToRole'](auxDepotToken);

    expect(service['router'].navigate).toHaveBeenCalledWith(
      service['routes'][Consts.AUX_DEPOT]
    );
  });

  it('should redirect to login if role not found', () => {
    jest.spyOn(service, 'getRoleValue').mockReturnValue(Consts.DUMMY_TOKEN);
    jest.spyOn(service['router'], 'navigate');

    service['handleRedirectionAccordingToRole'](auxDepotToken);

    expect(service['router'].navigate).toHaveBeenCalledWith([
      Consts.AUTH_LOGIN_PATH,
    ]);
  });

  it('should format body when sending the req', () => {
    const entity: NewUserForm = {
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

    service.createAuxDepot(entity).subscribe((res) => expect(res).toBeTruthy());

    const req = httpMock.expectOne(service['AuxDepotURL']);
    expect(req.request.method).toBe(TypeMethods.POST);
    expect(req.request.body).toEqual(formattedEntity);
    req.flush({});
  });
});
