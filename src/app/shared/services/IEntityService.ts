import { Observable } from "rxjs";
import { ArticleModel } from "src/app/shared/models/ArticleModel";
import { BrandModel } from "src/app/shared/models/BrandModel";
import { CategoryModel } from "src/app/shared/models/CategoryModel";
import { PageDTO } from "../models/PageDTO";

type Model = ArticleModel | BrandModel | CategoryModel;

export interface IEntityService {
	createEntity(entity: any): Observable<any>;
	getEntityPage(page: number, pageSize: number, column: string, direction: string): Observable<PageDTO<Model>>;
}