import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { TableComponent } from './table.component';
import { EntityServiceFactory } from '../../../shared/helpers/entityService/EntityServiceFactory';
import { of, throwError } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ArticleModel } from '../../../shared/models/ArticleModel';

import { jest } from '@jest/globals';
import { Consts, Direcitons } from '../../../utils/Constants';
import { Pageable, PageDTO } from 'src/app/shared/models/PageDTO';
import { CategoryModel } from 'src/app/shared/models/CategoryModel';
import { BrandModel } from 'src/app/shared/models/BrandModel';
import { Model } from 'src/app/shared/services/IEntityService';
import { CapitalizePipe } from '../../../shared/pipes/capitalize.pipe';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  let entityServiceFactory: EntityServiceFactory;

  beforeEach(async () => {
    const entityServiceFactoryMock = {
      getService: () => ({
        getEntityPage: () => of({
          content: [
            { name: 'Entity1' },
            { name: 'Entity2' }
          ],
          totalPages: Consts.ONE
        })
      })
    };

    await TestBed.configureTestingModule({
      declarations: [TableComponent, CapitalizePipe],
      providers: [
        { provide: EntityServiceFactory, useValue: entityServiceFactoryMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    entityServiceFactory = TestBed.inject(EntityServiceFactory);

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
    expect(component.loadData).toHaveBeenCalledTimes(1);
  });

  it('should sort data', () => {
    component.direction = Direcitons.ASC;
    component.onSort(Consts.NAME);
    expect(component.direction).toBe(Direcitons.DESC);
    expect(component.column).toBe(Consts.NAME);
  });

  it('should change page', () => {
    component.onPageChange(1);
    expect(component.page).toBe(1);
  });

  it('should handle table size change', () => {
    component.handleTableSize('10');
    expect(component.pageSize).toBe(Consts.TEN);
  });

  it('should handle error on load data', () => {
    const errorResponse = new ErrorEvent('Network error');

    jest.spyOn(component['entityService'], 'getEntityPage').mockReturnValue(throwError(() => errorResponse));
    jest.spyOn(console, 'error').mockImplementation(() => {});

    component.loadData();

    expect(console.error).toHaveBeenCalledWith('An error occurred while loading data', errorResponse);
  });

  it('should get value from row correctly', () => {
    const row: ArticleModel = {
      id: 1,
      description: Consts.DESCRIPTION,
      quantity: 2,
      updatedAt: new Date(Consts.DEFAULT_DATE),
      name: Consts.NAME,
      categories: [{ name: 'Category1', id: 1 }, { name: 'Category2', id: 2 }],
      brand: { name: Consts.BRAND_NAME, description: Consts.DESCRIPTION, id: 1 },
      price: 100
    };

    expect(component.getValue(row, Consts.NAME)).toBe(Consts.NAME);
    expect(component.getValue(row, Consts.CATEGORIES)).toBe('Category1, Category2');
    expect(component.getValue(row, Consts.BRAND)).toBe(Consts.BRAND_NAME);
    expect(component.getValue(row, Consts.PRICE)).toBe(100);
  });

  it('should handle changes in entityName', fakeAsync (() => {
    const getServiceSpy = jest.spyOn(entityServiceFactory, 'getService');

    component.ngOnChanges({ entityName: { currentValue: 'brand', previousValue: 'TestEntity', firstChange: false, isFirstChange: () => true } });
    tick()

    expect(getServiceSpy).toHaveBeenCalledWith('brand');
    expect(component.entityName).toBe('brand');
  }));

  it('should handle pagination correctly when total pages are more than 5 and current page is at the start', () => {
    const pageable: Pageable = {
      pageNumber: 0,
      pageSize: 2,
      offset: 0
    };

    component.pageDTO = {  
      totalElements: 2,
      totalPages: 10,
      pageable: pageable,
      numberOfElements: 2,
      currentPage: 1,
      size: 2,
      first: true,
      last: true, 
      content: [] 
    } as PageDTO<Model>;

    const result = component.getMiddleRange();
    expect(result).toEqual([0, 1, 2, 3, '...', 9]);
  });
  
  it('should handle pagination correctly when total pages are more than 5 and current page is at the end', () => {
    const pageable: Pageable = {
      pageNumber: 0,
      pageSize: 2,
      offset: 0
    };

    component.pageDTO = {  
      totalElements: 2,
      totalPages: 10,
      pageable: pageable,
      numberOfElements: 2,
      currentPage: 8,
      size: 2,
      first: true,
      last: true, 
      content: [] 
    } as PageDTO<ArticleModel | CategoryModel | BrandModel>;
    
    const result = component.getMiddleRange();
    expect(result).toEqual([0, '...', 6, 7, 8, 9]);
  });
  
  it('should handle pagination correctly when total pages are more than 5 and current page is in the middle', () => {
    const pageable: Pageable = {
      pageNumber: 0,
      pageSize: 2,
      offset: 0
    };

    component.pageDTO = {  
      totalElements: 2,
      totalPages: 10,
      pageable: pageable,
      numberOfElements: 2,
      currentPage: 5,
      size: 2,
      first: true,
      last: true, 
      content: [] 
    } as PageDTO<ArticleModel | CategoryModel | BrandModel>;

    const result = component.getMiddleRange();
    expect(result).toEqual([0, '...', 4, 5, 6, '...', 9]);
  });  
});
