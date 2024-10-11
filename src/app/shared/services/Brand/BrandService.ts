import { Injectable } from "@angular/core";
import { IEntityService } from "../IEntityService";
import { Observable } from "rxjs";
import { BrandModel } from "../../models/BrandModel";
import { PageDTO } from "../../models/PageDTO";
import { Consts } from "../../../utils/Constants";
import { environment } from "../../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { ArticleModel } from "../../models/ArticleModel";
import { CategoryModel } from "../../models/CategoryModel";

@Injectable({
  providedIn: 'root'
})
export class BrandService implements IEntityService {

  private baseURL = environment.STOCK_BASE_URL + Consts.BRAND_PATH;

  constructor(private http: HttpClient) { }

  createEntity(brand: string): Observable<any> {
    return this.http.post(this.baseURL, brand);
  }

  getEntityPage(page: number, pageSize: number, column: string, direction: string): Observable<PageDTO<ArticleModel | CategoryModel | BrandModel>> {
    throw new Error("Method not implemented.");
  }
}