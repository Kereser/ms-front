import {
  TestBed,
  ComponentFixture,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { TableComponent } from './table.component';
import { EntityServiceFactory } from '../../../shared/helpers/entityService/EntityServiceFactory';
import { of, throwError } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ArticleModel } from '@app/shared/models/ArticleModel';

import { jest } from '@jest/globals';
import { Consts, Direcitons, ToastTypes } from '../../../utils/Constants';
import { Pageable, PageDTO } from '@app/shared/models/PageDTO';
import { CategoryModel } from '@app/shared/models/CategoryModel';
import { BrandModel } from '@app/shared/models/BrandModel';
import { Model } from '@app/shared/services/IPageableService';
import { CapitalizePipe } from '../../../shared/pipes/capitalize.pipe';
import { ToastService } from '../../../shared/services/toast/toast.service';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  let serviceFactory: EntityServiceFactory;
  let toastService: ToastService;

  beforeEach(async () => {
    const entityServiceFactoryMock = {
      getPageableService: () => ({
        getEntityPage: () =>
          of({
            content: [{ name: 'Entity1' }, { name: 'Entity2' }],
            totalPages: Consts.ONE,
          }),
      }),
    };

    await TestBed.configureTestingModule({
      declarations: [TableComponent, CapitalizePipe],
      providers: [
        { provide: EntityServiceFactory, useValue: entityServiceFactoryMock },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    serviceFactory = TestBed.inject(EntityServiceFactory);
    toastService = TestBed.inject(ToastService);

    component.entityName = Consts.TEST_ENTITY;
    component.headers = [Consts.NAME];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load data on init', () => {
    jest.spyOn(component, 'loadData').mockImplementation(() => {});
    component.ngOnInit();
    expect(component.loadData).toHaveBeenCalledTimes(Consts.ONE);
  });

  it('should sort data', () => {
    component.direction = Direcitons.ASC;
    component.onSort(Consts.NAME);
    expect(component.direction).toBe(Direcitons.DESC);
    expect(component.column).toBe(Consts.NAME);
  });

  it('should change page', () => {
    component.onPageChange(Consts.ONE);
    expect(component.page).toBe(Consts.ONE);
  });

  it('should handle table size change', () => {
    component.handleTableSize('10');
    expect(component.pageSize).toBe(Consts.TEN);
  });

  it('should handle error on load data', () => {
    const errorResponse = new ErrorEvent('Network error');

    jest.spyOn(toastService, 'show');
    jest
      .spyOn(component['entityService'], 'getEntityPage')
      .mockReturnValue(throwError(() => errorResponse));

    component.loadData();

    expect(toastService.show).toHaveBeenCalledWith(
      ToastTypes.DANGER,
      'An error occurred while loading data'
    );
  });

  it('should get value from row correctly', () => {
    const row: ArticleModel = {
      id: Consts.ONE,
      description: Consts.DESCRIPTION,
      quantity: Consts.TWO,
      updatedAt: new Date(Consts.DEFAULT_DATE),
      name: Consts.NAME,
      categories: [
        { name: 'Category1', id: Consts.ONE },
        { name: 'Category2', id: Consts.TWO },
      ],
      brand: {
        name: Consts.BRAND_NAME,
        description: Consts.DESCRIPTION,
        id: Consts.ONE,
      },
      price: 100,
    };

    expect(component.getValue(row, Consts.NAME)).toBe(Consts.NAME);
    expect(component.getValue(row, Consts.CATEGORIES)).toBe(
      'Category1, Category2'
    );
    expect(component.getValue(row, Consts.BRAND)).toBe(Consts.BRAND_NAME);
    expect(component.getValue(row, Consts.PRICE)).toBe(100);
  });

  it('should sort categories with categories:name', () => {
    jest.spyOn(component, 'loadData').mockImplementation(() => {});

    component.onSort(Consts.CATEGORIES);

    expect(component.loadData).toHaveBeenCalledTimes(1);
    expect(component.column).toBe(Consts.SORT_CATEGORY_NAMES);
  });

  it('should handle changes in entityName', fakeAsync(() => {
    const getServiceSpy = jest.spyOn(serviceFactory, 'getPageableService');

    component.ngOnChanges({
      entityName: {
        currentValue: 'brand',
        previousValue: 'TestEntity',
        firstChange: false,
        isFirstChange: () => true,
      },
    });
    tick();

    expect(getServiceSpy).toHaveBeenCalledWith('brand');
    expect(component.entityName).toBe('brand');
  }));

  it('should handle pagination correctly when total pages are more than 5 and current page is at the start', () => {
    const pageable: Pageable = {
      pageNumber: Consts.ZERO,
      pageSize: Consts.TWO,
      offset: Consts.ZERO,
    };

    component.pageDTO = {
      totalElements: Consts.TWO,
      totalPages: 10,
      pageable: pageable,
      numberOfElements: Consts.TWO,
      currentPage: Consts.ONE,
      size: Consts.TWO,
      first: true,
      last: true,
      content: [],
    } as PageDTO<Model>;

    const result = component.getMiddleRange();
    expect(result).toEqual([Consts.ZERO, Consts.ONE, Consts.TWO, 3, '...', 9]);
  });

  it('should handle pagination correctly when total pages are more than 5 and current page is at the end', () => {
    const pageable: Pageable = {
      pageNumber: Consts.ZERO,
      pageSize: Consts.TWO,
      offset: Consts.ZERO,
    };

    component.pageDTO = {
      totalElements: Consts.TWO,
      totalPages: 10,
      pageable: pageable,
      numberOfElements: Consts.TWO,
      currentPage: 8,
      size: Consts.TWO,
      first: true,
      last: true,
      content: [],
    } as PageDTO<ArticleModel | CategoryModel | BrandModel>;

    const result = component.getMiddleRange();
    expect(result).toEqual([Consts.ZERO, '...', 6, 7, 8, 9]);
  });

  it('should handle pagination correctly when total pages are more than 5 and current page is in the middle', () => {
    const pageable: Pageable = {
      pageNumber: Consts.ZERO,
      pageSize: Consts.TWO,
      offset: Consts.ZERO,
    };

    component.pageDTO = {
      totalElements: Consts.TWO,
      totalPages: 10,
      pageable: pageable,
      numberOfElements: Consts.TWO,
      currentPage: 5,
      size: Consts.TWO,
      first: true,
      last: true,
      content: [],
    } as PageDTO<ArticleModel | CategoryModel | BrandModel>;

    console.log('serviceFActory ', serviceFactory);
    const result = component.getMiddleRange();
    expect(result).toEqual([Consts.ZERO, '...', 4, 5, 6, '...', 9]);
  });
});
