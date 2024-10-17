import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { EntityServiceFactory } from '../../../shared/helpers/entityService/EntityServiceFactory';
import { PageDTO } from '../../../shared/models/PageDTO';
import { IEntityService, Model } from '../../../shared/services/IEntityService';
import { Consts, Direcitons } from '../../../utils/Constants';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnChanges {
  @Input() headers: string[] = [];
  @Input() clickableHeaders: string[] = [Consts.NAME];
  @Input() entityName!: string;
  @Input() pageSize: number = Consts.ONE;
  @Input() page: number = Consts.ZERO;

  pageDTO!: PageDTO<Model>;
  entityService!: IEntityService;

  direction: Direcitons = Direcitons.ASC;
  column: string = Consts.NAME;

  constructor(private serviceFactory: EntityServiceFactory) { }

  ngOnInit(): void {
    this.reloadDashboard();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['entityName']) {
      this.entityName = changes['entityName'].currentValue;
      this.reloadDashboard();
    }
  }

  loadData(): void {
    this.entityService.getEntityPage(this.page, this.pageSize, this.column, this.direction).subscribe({
      next: (pageData: PageDTO<Model>) => {
        this.pageDTO = pageData;
      },
      error: err => {
        console.error("An error occurred while loading data", err);
      }
    });
  }

  onSort(field: string): void {
    this.direction = this.getReverseSort(this.direction);
    this.setColumn(field);

    this.loadData();
  }

  private setColumn(field: string) {
    if (field.toLowerCase() === Consts.CATEGORIES.toLowerCase()) {      
      this.column = Consts.SORT_CATEGORY_NAMES;
      return;
    }
    this.column = field.toLowerCase();
  }

  onPageChange(page: number | string): void {
    this.page = page as number;
    this.loadData();
  }

  getValue(row: Model, header: string): any {
    const value = (row as any)[header.toLowerCase()];
    if (Array.isArray(value)) {
      return value.map(item => item.name).join(', ');
    }
    if (typeof value === 'object' && value !== null && Consts.NAME in value) {
      return value.name;
    }
    return value;
  }

  handleTableSize(size: string) {
    this.pageSize = parseInt(size);
    this.page = 0;
    this.loadData();
  }

  getMiddleRange(): (number | string)[] {
    if (this.validDTO(this.pageDTO)) return [];

    const totalPages = this.pageDTO.totalPages;
    if (totalPages <= 5) {
      return this.handleFewPages();
    } else {
      return this.handleManyPages();
    }
  }

  getDisplayableValue(page: number | string) {
    return page as number + 1;
  }

  private getReverseSort(order: string): Direcitons {
    return order === Direcitons.ASC ? Direcitons.DESC : Direcitons.ASC;
  }

  private validDTO(pageDTO: any): boolean {
    return !pageDTO;
  }

  private handleFewPages(): (number | string)[] {
    const totalPages = this.pageDTO.totalPages;
    return Array.from({ length: totalPages }, (_, i) => i);
  }

  private handleManyPages(): (number | string)[] {
    const totalPages = this.pageDTO.totalPages;
    const currentPage = this.pageDTO.currentPage;

    if (currentPage <= 2) {
      return [0, 1, 2, 3, '...', totalPages - 1];
    } else if (currentPage >= totalPages - 3) {
      return [0, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1];
    } else {
      return [0, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages - 1];
    }
  }

  private reloadDashboard() {
    this.entityService = this.serviceFactory.getService(this.entityName);
    this.loadData();
  }
}
