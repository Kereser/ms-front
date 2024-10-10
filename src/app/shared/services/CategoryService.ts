import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IEntityService } from "./IEntityService";
import { environment } from "../../../environments/environment";
import { Consts } from "../../utils/Constants";
import { CategoryModel } from "src/app/shared/models/CategoryModel";
import { PageDTO } from "../models/PageDTO";


@Injectable({
    providedIn: 'root'
})
export class CategoryService implements IEntityService {

    private baseURL = environment.STOCK_BASE_URL + Consts.CATEGORIES_PATH;

    constructor(private http: HttpClient) { }

    createEntity(category: string): Observable<any> {
        return this.http.post(this.baseURL, category);
    }

    getEntityPage(page: number, pageSize: number, column: string, sortOrder: string): Observable<PageDTO<CategoryModel>> {
        const direction = sortOrder.toUpperCase();
        return this.http.get<PageDTO<CategoryModel>>(this.baseURL, { params: {page, pageSize, column, direction} });
    }
}