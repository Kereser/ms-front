import {
  Component,
  forwardRef,
  Inject,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { PageDTO } from '@app/shared/models/PageDTO';
import {
  Consts,
  Direcitons,
  OnChangesType,
  TABLE_INFO_BY_ENTITY,
  ToastTypes,
} from '@app/utils/Constants';
import { ToastService } from '@app/shared/services/toast/toast.service';
import {
  FORM_ACTION,
  TABLE_ACTTION,
} from '@app/shared/token/injection-token.provider';
import { Observable } from 'rxjs';
import { PageableType } from '@app/shared/models/PageableType';
import { ArticleModel } from '@app/shared/models/ArticleModel';
import { UserService } from '@app/shared/services/user/user.service';
import { tableFactory } from './table.provider';
import { ArticleService } from '@app/shared/services/Article/ArticleService';
import { ModalComponent } from '@app/components/atoms/modal/modal.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  providers: [
    {
      provide: FORM_ACTION,
      useFactory: tableFactory,
      deps: [ArticleService, forwardRef(() => TableComponent)],
    },
  ],
})
export class TableComponent implements OnInit, OnChanges {
  @Input() entityName!: string;
  @Input() pageSize: number = Consts.FIVE;
  @Input() page: number = Consts.ONE;

  headers: string[] = [];
  clickable: string[] = [];

  pageDTO!: PageDTO<PageableType>;

  direction: Direcitons = Direcitons.ASC;
  column: string = Consts.NAME;

  isHovering: boolean = false;
  idxHovered: number | null = null;

  selectedConent: ArticleModel | null = null;

  @ViewChild('modal') modal!: ModalComponent;

  constructor(
    private toastService: ToastService,
    public userService: UserService,
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
    this.headers = TABLE_INFO_BY_ENTITY[this.entityName].headers;
    this.clickable = TABLE_INFO_BY_ENTITY[this.entityName].clickable;
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
      error: (_) => {
        this.toastService.show(
          ToastTypes.DANGER,
          Consts.ERROR_WHILE_LOADING_DATA
        );
      },
    });
  }

  updateCurrentPage(page: number) {
    this.page = page;
    this.loadData();
  }

  onSort(field: string): void {
    this.direction = this.getReverseSort(this.direction);
    this.setColumn(field);

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

  mouseOverFn(idx: number) {
    this.isHovering = true;
    this.idxHovered = idx;
  }

  mouseLeave() {
    this.isHovering = false;
    this.idxHovered = null;
  }

  onSettingsClick() {
    this.selectedConent = this.pageDTO.content[
      this.idxHovered!
    ] as ArticleModel;
    this.modal.openModal();
  }

  closeModal() {
    this.modal.closeModal();
  }

  isVisibleModal() {
    return this.modal?.getVisible();
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

  reloadDashboard() {
    this.reloadFilters();
    this.loadData();
  }

  private reloadFilters() {
    this.column = Consts.NAME;
    this.direction = Direcitons.ASC;
    this.page = Consts.ZERO;
  }
}
