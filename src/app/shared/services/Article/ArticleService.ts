import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, switchMap, throwError } from "rxjs";
import { PageDTO } from "../../models/PageDTO";
import { ArticleModel } from "../../models/ArticleModel";
import { IEntityService } from "../IEntityService";
import { environment } from "../../../../environments/environment";
import { Consts } from "../../../utils/Constants";
import { CategoryService } from "../Category/CategoryService";
import { BrandService } from "../Brand/BrandService";
import { CategoryModel } from "../../models/CategoryModel";
import { BrandModel } from "../../models/BrandModel";

interface ArticleForm {
	name: string,
	description: string,
	price: string,
	quantity: string,
	'Category Names': string,
	'Brand Name': string
}

interface ArticleRequest {
	name: string,
	description: string,
	price: string,
	quantity: string,
	categoryIds: Array<number>,
	brandId: number
}

@Injectable({
	providedIn: 'root'
})
export class ArticleService implements IEntityService {

	private baseURL = environment.STOCK_BASE_URL + Consts.ARTICLES_PATH;

	categoryList!: CategoryModel[];
	brandList!: BrandModel[];

	constructor(private http: HttpClient,
		private categoryService: CategoryService,
		private brandService: BrandService) { }

	createEntity(entity: any): Observable<any> {
		console.log(entity);

		return this.categoryService.getByNames(entity[Consts.CATEGORY_NAMES]).pipe(
			switchMap(list => {
				this.validateCategoryList(list, entity);
				return this.brandService.getByName(entity[Consts.BRAND_NAME]);
			}),
			switchMap(list => {
				this.validateBrandList(list);
				const entityToSend = this.replaceNamesToIds(entity);
				return this.http.post<Observable<any>>(this.baseURL, entityToSend);
			}),
			catchError(error => {
				return throwError(() => error);
			}));
	}

	getEntityPage(page: number, pageSize: number, column: string, sortOrder: string): Observable<PageDTO<ArticleModel>> {
		const direction = sortOrder.toUpperCase();

		return this.http.get<PageDTO<ArticleModel>>(this.baseURL, { params: { page, pageSize, column, direction } });
	}

	private validateCategoryList(list: CategoryModel[], entity: any): void {
		const enteredList = entity[Consts.CATEGORY_NAMES].split(Consts.COMMA);
		if (list.length < enteredList.length) {
			throw new Error(Consts.CATEGORIES_NOT_FOUND);
		}
		this.categoryList = list;
	}

	private validateBrandList(list: BrandModel[]) {
		if (list.length < 1) {
			throw new Error(Consts.BRANDS_NOT_FOUND);
		}
		this.brandList = list;
	}

	private replaceNamesToIds(entity: ArticleForm) {
		const { name, description, price, quantity } = entity;

		const reqObj = {
			name,
			description,
			price,
			quantity,
			categoryIds: this.getIdsFromList(this.categoryList),
			brandId: this.getIdsFromList(this.brandList)[0]
		}

		return reqObj;
	}

	private getIdsFromList(list: (CategoryModel | BrandModel)[]): Array<number> {
		return list.map(c => c.id);
	}
}

