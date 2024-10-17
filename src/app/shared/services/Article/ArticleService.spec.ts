import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ArticleService } from './ArticleService';
import { PageDTO, Pageable } from '../../models/PageDTO';
import { ArticleModel } from '../../models/ArticleModel';
import { environment } from '../../../../environments/environment';
import { article1, article2, Consts, Direcitons } from '../../../utils/Constants';
import { CategoryService } from '../Category/CategoryService';
import { BrandService } from '../Brand/BrandService';
import { of } from 'rxjs';
import { BrandModel } from '../../models/BrandModel';
import { CategoryModel } from '../../models/CategoryModel';

describe('ArticleService', () => {
  let service: ArticleService;
  let httpMock: HttpTestingController;
  let categoryService: CategoryService;
  let brandService: BrandService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ArticleService, CategoryService, BrandService]
    });

    service = TestBed.inject(ArticleService);
    httpMock = TestBed.inject(HttpTestingController);
    categoryService = TestBed.inject(CategoryService);
    brandService = TestBed.inject(BrandService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should handle error when creating an entity', (done) => {
    const mockEntity = {
      name: 'Test Article',
      description: 'Test Description',
      price: '100',
      quantity: '10',
      'Category Names': 'Category1,Category2',
      'Brand Name': 'Brand1'
    };

    const mockError = { message: Consts.FIELD_VALIDATION_ERRORS };

    jest.spyOn(categoryService, 'getByNames').mockReturnValue(of([{ id: 1, name: 'Category1' }, { id: 2, name: 'Category2' }] as CategoryModel[]));
    jest.spyOn(brandService, 'getByName').mockReturnValue(of([{ id: 1, name: 'Brand1' }] as BrandModel[]));

    service.createEntity(mockEntity).subscribe({
      next: () => fail('expected an error, not an entity'),
      error: (error) => {
        expect(error.error.message).toBe(Consts.FIELD_VALIDATION_ERRORS);
        done();
      }
    });

    const req = httpMock.expectOne(`${environment.STOCK_BASE_URL}${Consts.ARTICLES_PATH}`);
    expect(req.request.method).toBe('POST');

    req.flush(mockError, { status: 400, statusText: 'bad request' });
  });

  it('should fetch a page of articles', () => {
    const pageable: Pageable = {
      pageNumber: Consts.ZERO,
      pageSize: Consts.TWO,
      offset: Consts.ZERO
    };

    const mockResponse: PageDTO<ArticleModel> = {
      totalElements: Consts.TWO,
      totalPages: Consts.ONE,
      pageable: pageable,
      numberOfElements: Consts.TWO,
      currentPage: Consts.ZERO,
      size: Consts.TWO,
      first: true,
      last: true,
      content: [
        article1,
        article2
      ]
    };

    service.getEntityPage(Consts.ZERO, Consts.TWO, Consts.NAME, Direcitons.ASC).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.STOCK_BASE_URL + Consts.ARTICLES_PATH}?page=0&pageSize=2&column=name&direction=ASC`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should build ids from names', () => {
    const mockEntity = {
      name: 'Test Article',
      description: 'Test Description',
      price: '100',
      quantity: '10',
      'Category Names': 'Category1,Category2',
      'Brand Name': 'Brand1'
    };

    jest.spyOn(categoryService, 'getByNames').mockReturnValue(of([{ id: 1, name: 'Category1' }, { id: 2, name: 'Category2' }] as CategoryModel[]));
    jest.spyOn(brandService, 'getByName').mockReturnValue(of([{ id: 1, name: 'Brand1' }] as BrandModel[]));

    service.createEntity(mockEntity).subscribe({});

    const req = httpMock.expectOne(`${environment.STOCK_BASE_URL + Consts.ARTICLES_PATH}`);
    expect(req.request.method).toBe('POST');

    const { name, description, price, quantity } = mockEntity;
    const mockWithIds = {
      name,
      description,
      price,
      quantity,
      [Consts.CATEGORY_IDS]: [Consts.ONE, Consts.TWO],
      [Consts.BRAND_ID]: Consts.ONE
    };

    expect(req.request.body).toEqual(mockWithIds);
    req.flush(mockWithIds);
  });

  it('should throw an error when all categories were not found', (done) => {
    const mockEntity = {
      name: 'Test Article',
      description: 'Test Description',
      price: '100',
      quantity: '10',
      'Category Names': 'Category1,Category2',
      'Brand Name': 'Brand1'
    };

    jest.spyOn(categoryService, 'getByNames').mockReturnValue(of([{ id: 1, name: 'Category1' }] as CategoryModel[]));

    service.createEntity(mockEntity).subscribe({
      next: () => done.fail('Expected an error, but got a successful response'),
      error: data => {
        expect(data.message).toBe(Consts.CATEGORIES_NOT_FOUND);
        done();
      }
    });

    httpMock.expectNone(`${environment.STOCK_BASE_URL + Consts.ARTICLES_PATH}`);
  });

  it('should throw an error when brand were not found', (done) => {
    const mockEntity = {
      name: 'Test Article',
      description: 'Test Description',
      price: '100',
      quantity: '10',
      'Category Names': 'Category1,Category2',
      'Brand Name': 'Brand1'
    };

    jest.spyOn(categoryService, 'getByNames').mockReturnValue(of([{ id: 1, name: 'Category1' }, { id: 2, name: 'Category2' }] as CategoryModel[]));
    jest.spyOn(brandService, 'getByName').mockReturnValue(of([] as BrandModel[]));

    service.createEntity(mockEntity).subscribe({
      next: () => done.fail('Expected an error, but got a successful response'),
      error: data => {
        expect(data.message).toBe(Consts.BRANDS_NOT_FOUND);
        done();
      }
    });

    httpMock.expectNone(`${environment.STOCK_BASE_URL + Consts.ARTICLES_PATH}`);
  });
});
