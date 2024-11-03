import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageableType } from '@app/shared/models/PageableType';
import { PageDTO } from '@app/shared/models/PageDTO';
import { Consts } from '@app/utils/Constants';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
  @Input() pageDTO!: PageDTO<PageableType>;
  @Input() pageSize: number = Consts.FIVE;
  @Input() page: number = Consts.ONE;

  @Output() currentPage = new EventEmitter<number>();

  onPageChange(page: number | string): void {
    this.page = page as number;
    this.currentPage.emit(this.page);
  }

  getDisplayableValue(page: number | string) {
    return (page as number) + 1;
  }

  getMiddleRange(): (number | string)[] {
    console.log('page obj: ', this.pageDTO);
    if (this.invalidDTO(this.pageDTO)) return [];

    const totalPages = this.pageDTO.totalPages;
    if (totalPages <= 5) {
      return this.handleFewPages();
    } else {
      return this.handleManyPages();
    }
  }

  private invalidDTO(pageDTO: any): boolean {
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
}
