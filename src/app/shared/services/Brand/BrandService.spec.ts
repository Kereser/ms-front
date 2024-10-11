import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BrandService } from './BrandService';
import { environment } from '../../../../environments/environment';
import { Consts } from '../../../utils/Constants';
import { BrandModel } from '../../models/BrandModel';
import { Pageable, PageDTO } from '../../models/PageDTO';

describe('BrandService', () => {
  let service: BrandService;
  let httpMock: HttpTestingController;
  const baseURL = environment.STOCK_BASE_URL + Consts.BRAND_PATH;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BrandService],
    });

    service = TestBed.inject(BrandService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call createEntity with the correct URL', () => {
    const brand = 'Test Brand';

    service.createEntity(brand).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(baseURL);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toBe(brand);
    req.flush({});
  });

  it('should call getEntityPage with the correct URL and parameters', () => {
    const pageable: Pageable = {
      pageNumber: 0,
      pageSize: 2,
      offset: 0
    };

    const page = 1;
    const pageSize = 10;
    const column = 'name';
    const direction = 'asc';
    const mockResponse: PageDTO<BrandModel> = {
      totalElements: 2,
      totalPages: 1,
      pageable: pageable,
      numberOfElements: 2,
      currentPage: 0,
      size: 2,
      first: true,
      last: true,
      content: []
    };

    service.getEntityPage(page, pageSize, column, direction).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(req => req.url === baseURL && req.params.get('page') === `${page}` && req.params.get('pageSize') === `${pageSize}` && req.params.get('column') === column && req.params.get('direction') === direction.toUpperCase());
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
