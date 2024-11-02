import { ArticleService } from '@app/shared/services/Article/ArticleService';
import { UserService } from '@app/shared/services/user/user.service';
import { TableComponent } from './table.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { tableFactory } from './table.provider';
import { of } from 'rxjs';
import { ArticleModel } from '@app/shared/models/ArticleModel';
import { Consts } from '@app/utils/Constants';
import { TABLE_ACTTION } from '@app/shared/token/injection-token.provider';
import { table } from 'console';

describe('dashboardPageFactory', () => {
  let articleService: ArticleService;
  let tableComponent: TableComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        TableComponent,
        {
          provide: TABLE_ACTTION,
          useValue: jest.fn(),
        },
      ],
    }).compileComponents();

    articleService = TestBed.inject(ArticleService);
    tableComponent = TestBed.inject(TableComponent);
  });

  it('should call addSupply with correct arguments', (done) => {
    const selectedContent = {
      id: Consts.ONE,
      quantity: Consts.TWO,
      description: Consts.DESCRIPTION,
      price: Consts.ONE_HUNDRED_TWENTY,
    } as ArticleModel;

    jest.spyOn(articleService, 'addSupply').mockReturnValue(of({}));
    tableComponent.selectedConent = selectedContent;
    jest.spyOn(tableComponent, 'closeModal');
    jest
      .spyOn(tableComponent, 'reloadDashboard')
      .mockImplementation(() => of({}).subscribe());

    const factory = tableFactory(articleService, tableComponent);
    const observable = factory({ quantity: 2 });

    expect(articleService.addSupply).toHaveBeenCalledWith({ quantity: 2 }, 1);
    observable.subscribe({
      next: () => {
        expect(tableComponent.reloadDashboard).toHaveBeenCalledTimes(1);
        expect(tableComponent.closeModal).toHaveBeenCalledTimes(1);
        done();
      },
    });
  });
});
