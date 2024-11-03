import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationComponent } from './pagination.component';
import { Consts } from '@app/utils/Constants';
import { Pageable, PageDTO } from '@app/shared/models/PageDTO';
import { PageableType } from '@app/shared/models/PageableType';
import { of } from 'rxjs';
import { ArticleModel } from '@app/shared/models/ArticleModel';
import { CategoryModel } from '@app/shared/models/CategoryModel';
import { BrandModel } from '@app/shared/models/BrandModel';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;
  let executable = jest.fn();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaginationComponent],
    }).compileComponents();

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

    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change page', () => {
    component.onPageChange(Consts.ONE);
    expect(component.page).toBe(Consts.ONE);
  });

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
      currentPage: Consts.ZERO,
      size: Consts.TWO,
      first: true,
      last: true,
      content: [],
    } as PageDTO<PageableType>;

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

  it('should add 1 to page values', () => {
    expect(component.getDisplayableValue(1)).toBe(2);
  });
});
