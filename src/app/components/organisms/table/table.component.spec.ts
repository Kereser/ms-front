import {
  TestBed,
  ComponentFixture,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { TableComponent } from './table.component';
import { of, throwError } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ArticleModel } from '@app/shared/models/ArticleModel';

import {
  Consts,
  Direcitons,
  StatusCodes,
  ToastTypes,
} from '@app/utils/Constants';
import { Pageable, PageDTO } from '@app/shared/models/PageDTO';
import { CategoryModel } from '@app/shared/models/CategoryModel';
import { BrandModel } from '@app/shared/models/BrandModel';
import { CapitalizePipe } from '@app/shared/pipes/capitalize.pipe';
import { ToastService } from '@app/shared/services/toast/toast.service';
import { TABLE_ACTTION } from '@app/shared/token/injection-token.provider';
import { HttpErrorResponse } from '@angular/common/http';
import { PageableType } from '@app/shared/models/PageableType';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ModalComponent } from '@app/components/atoms/modal/modal.component';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  let toastService: ToastService;
  let executable = jest.fn();

  beforeEach(async () => {
    executable.mockImplementation((page, pageSize, column, direction) => {
      return of({
        totalElements: 20,
        totalPages: 10,
        pageable: { pageNumber: page, pageSize, offset: page * pageSize },
        numberOfElements: pageSize,
        currentPage: page,
        size: pageSize,
        first: page === 0,
        last: page === 9,
        content: [],
      } as PageDTO<PageableType>);
    });

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [TableComponent, CapitalizePipe, ModalComponent],
      providers: [
        {
          provide: TABLE_ACTTION,
          useValue: executable,
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    toastService = TestBed.inject(ToastService);

    executable.mockClear();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;

    component.modal = TestBed.createComponent(ModalComponent).componentInstance;

    component.entityName = Consts.CATEGORY;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load data on init', () => {
    executable.mockReturnValue(of({}));

    jest.spyOn(component, 'loadData').mockImplementation(() => {});
    component.ngOnInit();
    expect(component.loadData).toHaveBeenCalledTimes(Consts.ONE);
  });

  it('should sort data', () => {
    executable.mockReturnValue(of({}));

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
    jest.spyOn(toastService, 'show');
    executable.mockReturnValue(
      throwError(
        () => new HttpErrorResponse({ status: StatusCodes.InternalServerError })
      )
    );

    component.loadData();

    expect(toastService.show).toHaveBeenCalledWith(
      ToastTypes.DANGER,
      Consts.ERROR_WHILE_LOADING_DATA
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
    component.ngOnChanges({
      entityName: {
        currentValue: 'brand',
        previousValue: 'TestEntity',
        firstChange: false,
        isFirstChange: () => true,
      },
    });
    tick();

    expect(component.entityName).toBe('brand');
  }));

  it('should handle pagination correctly when total pages are more than 5 and current page is at the start', () => {
    executable.mockImplementation((page, pageSize, column, direction) => {
      return of({
        totalElements: Consts.TWO,
        totalPages: 10,
        pageable: pageable,
        numberOfElements: Consts.TWO,
        currentPage: Consts.ONE,
        size: Consts.TWO,
        first: true,
        last: true,
        content: [],
      } as PageDTO<PageableType>);
    });
    const pageable: Pageable = {
      pageNumber: Consts.ZERO,
      pageSize: Consts.TWO,
      offset: Consts.ZERO,
    };

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
    } as PageDTO<PageableType>;

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

    const result = component.getMiddleRange();
    expect(result).toEqual([Consts.ZERO, '...', 4, 5, 6, '...', 9]);
  });

  it('should handle pagination correctly when total pages are less than 5 and current page is at start', () => {
    executable.mockImplementation((page, pageSize, column, direction) => {
      return of({
        totalElements: Consts.TWO,
        totalPages: 5,
        pageable: pageable,
        numberOfElements: Consts.TWO,
        currentPage: Consts.ONE,
        size: Consts.TWO,
        first: true,
        last: true,
        content: [],
      } as PageDTO<PageableType>);
    });

    const pageable: Pageable = {
      pageNumber: Consts.ZERO,
      pageSize: Consts.TWO,
      offset: Consts.ZERO,
    };

    component.pageDTO = {
      totalElements: Consts.TWO,
      totalPages: 5,
      pageable: pageable,
      numberOfElements: Consts.TWO,
      currentPage: 5,
      size: Consts.TWO,
      first: true,
      last: true,
      content: [],
    } as PageDTO<ArticleModel | CategoryModel | BrandModel>;

    const result = component.getMiddleRange();
    expect(result).toEqual([0, 1, 2, 3, 4]);
  });

  it('should get data from modal', () => {
    component.modal.isVisible = false;

    const res = component.isVisibleModal();

    expect(res).toBeFalsy();
  });

  it('should update isVisible on modal when closeModal()', () => {
    jest.spyOn(component.modal, 'closeModal');
    component.modal.isVisible = true;

    component.closeModal();

    expect(component.modal.closeModal).toHaveBeenCalledTimes(1);
  });

  it('should open modal and set selectedContent', () => {
    jest.spyOn(component.modal, 'openModal');

    component.onSettingsClick();

    expect(component.selectedConent).not.toBeNull();
    expect(component.modal.openModal).toHaveBeenCalledTimes(1);
  });

  it('should set idx and isHovering when trigger mouseover and mouseleave', () => {
    component.mouseOverFn(1);

    expect(component.isHovering).toBeTruthy();
    expect(component.idxHovered).toBe(1);

    component.mouseLeave();

    expect(component.isHovering).toBeFalsy();
    expect(component.idxHovered).toBeNull();
  });
});
