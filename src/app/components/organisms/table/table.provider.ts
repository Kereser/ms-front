import {
  ArticleService,
  SupplyForm,
} from '@app/shared/services/Article/ArticleService';
import { ArticleModel } from '@app/shared/models/ArticleModel';
import { TableComponent } from './table.component';

export const tableFactory = (
  articleService: ArticleService,
  tableComponent: TableComponent
) => {
  return (entity: SupplyForm) => {
    const selectedRow = tableComponent.selectedConent as ArticleModel;
    const { id } = selectedRow;

    const observable = articleService.addSupply(entity, id);

    observable.subscribe({
      next: () => {
        tableComponent.reloadDashboard();
        tableComponent.closeModal();
      },
    });

    return observable;
  };
};
