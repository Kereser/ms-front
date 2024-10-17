import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CategoryService } from './CategoryService';
import { PageDTO, Pageable } from '../../models/PageDTO';
import { CategoryModel } from '../../models/CategoryModel';
import { environment } from '../../../../environments/environment';
import { category1, category2, Consts, Direcitons } from '../../../utils/Constants';

describe('CategoryService', () => {
  let service: CategoryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CategoryService]
    });

    service = TestBed.inject(CategoryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a category', () => {
    const category = 'New Category';
    service.createEntity(category).subscribe((response: any) => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(service['baseURL']);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toBe(category);
    req.flush({ success: true });
  });

  it('should fetch a page of categories', () => {
    const pageable: Pageable = {
      pageNumber: 0,
      pageSize: 2,
      offset: 0
    };

    const mockResponse: PageDTO<CategoryModel> = {
      totalElements: 2,
      totalPages: 1,
      pageable: pageable,
      numberOfElements: 2,
      currentPage: 0,
      size: 2,
      first: true,
      last: true,
      content: [
        category1,
        category2
      ]
    };

    service.getEntityPage(Consts.ZERO, Consts.TWO, Consts.NAME, Direcitons.ASC).subscribe((response: any) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.STOCK_BASE_URL + Consts.CATEGORIES_PATH}?page=0&pageSize=2&column=name&direction=ASC`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should handle HTTP errors correctly', () => {
    const errorResponse = { status: 404, statusText: 'Not Found' };

    service.getEntityPage(Consts.ZERO, Consts.TWO, Consts.NAME, Direcitons.ASC).subscribe({
      next: () => fail('should have failed with 404 error'),
      error: (error: any) => {
        expect(error.status).toEqual(404);
        expect(error.statusText).toEqual('Not Found');
      }});

    const req = httpMock.expectOne(`${environment.STOCK_BASE_URL + Consts.CATEGORIES_PATH}?page=0&pageSize=2&column=name&direction=ASC`);
    expect(req.request.method).toBe('GET');

    req.flush(null, errorResponse);
  });

  it('should get category by names', (done) => {
    const baseURL = environment.STOCK_BASE_URL + Consts.CATEGORIES_PATH;
    const byNameURL = baseURL + Consts.BY_NAMES_PATH;

    const mockedReponse: CategoryModel[] = [{
      id: 1,
      name: 'anyName',
      description: 'anything',
    }]
    
    service.getByNames('anyName').subscribe({
      next: (response) => {
        expect(response).toBe(mockedReponse);
        done();
      },
      error: (err) => done.fail('expected a successful response, not an error: ' + err)
    });

    const req = httpMock.expectOne(`${byNameURL}?names=anyName`);
    expect(req.request.method).toBe('GET');
    req.flush(mockedReponse, {});
  });
});
