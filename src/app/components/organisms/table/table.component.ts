import {
  Component,
  Inject,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { PageDTO } from '@app/shared/models/PageDTO';
import {
  Consts,
  Direcitons,
  OnChangesType,
  ToastTypes,
} from '@app/utils/Constants';
import { ToastService } from '@app/shared/services/toast/toast.service';
import { TABLE_ACTTION } from '@app/shared/token/injection-token.provider';
import { Observable } from 'rxjs';
import { PageableType } from '@app/shared/models/PageableType';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, OnChanges {
  @Input() headers: string[] = [];
  @Input() clickableHeaders: string[] = [Consts.NAME];
  @Input() entityName!: string;
  @Input() pageSize: number = Consts.FIVE;
  @Input() page: number = Consts.ONE;

  pageDTO!: PageDTO<PageableType>;

  direction: Direcitons = Direcitons.ASC;
  column: string = Consts.NAME;

  constructor(
    private toastService: ToastService,
    @Inject(TABLE_ACTTION)
    private executable: (
      page: number,
      pageSize: number,
      column: string,
      direction: Direcitons
    ) => Observable<PageDTO<PageableType>>
  ) {}

  ngOnInit(): void {
    this.reloadDashboard();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes[OnChangesType.ENTITY_NAME]) {
      this.entityName = changes[OnChangesType.ENTITY_NAME].currentValue;
      this.reloadDashboard();
    }
  }

  loadData(): void {
    this.executable(
      this.page,
      this.pageSize,
      this.column,
      this.direction
    ).subscribe({
      next: (pageData: PageDTO<PageableType>) => {
        this.pageDTO = pageData;
      },
      error: (ex) => {
        console.log('entro al error: ', ex);
        this.toastService.show(
          ToastTypes.DANGER,
          Consts.ERROR_WHILE_LOADING_DATA
        );
      },
    });
  }

  onSort(field: string): void {
    this.direction = this.getReverseSort(this.direction);
    this.setColumn(field);

    this.loadData();
  }

  onPageChange(page: number | string): void {
    this.page = page as number;
    this.loadData();
  }

  getValue(row: PageableType, header: string) {
    const value = (row as any)[header.toLowerCase()];
    if (Array.isArray(value)) {
      return value.map((item) => item.name).join(', ');
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
    return (page as number) + 1;
  }

  private setColumn(field: string) {
    if (field.toLowerCase() === Consts.CATEGORIES.toLowerCase()) {
      this.column = Consts.SORT_CATEGORY_NAMES;
      return;
    }
    this.column = field.toLowerCase();
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
      return [
        0,
        '...',
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
      ];
    } else {
      return [
        0,
        '...',
        currentPage - 1,
        currentPage,
        currentPage + 1,
        '...',
        totalPages - 1,
      ];
    }
  }

  private reloadDashboard() {
    this.reloadFilters();
    this.loadData();
  }

  private reloadFilters() {
    this.column = Consts.NAME;
    this.direction = Direcitons.ASC;
    this.page = Consts.ZERO;
  }
}
