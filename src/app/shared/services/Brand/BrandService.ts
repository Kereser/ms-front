import { Injectable } from "@angular/core";
import { IEntityService } from "../IEntityService";
import { Observable } from "rxjs";
import { BrandModel } from "../../models/BrandModel";
import { PageDTO } from "../../models/PageDTO";
import { Consts } from "../../../utils/Constants";
import { environment } from "../../../../environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BrandService implements IEntityService {

  private baseURL = environment.STOCK_BASE_URL + Consts.BRAND_PATH;
  private byNameURL = this.baseURL + Consts.BY_NAMES_PATH;

  constructor(private http: HttpClient) { }

  createEntity(brand: string): Observable<any> {
    return this.http.post(this.baseURL, brand);
  }

  getEntityPage(page: number, pageSize: number, column: string, direction: string): Observable<PageDTO<BrandModel>> {
    direction = direction.toUpperCase();
    return this.http.get<PageDTO<BrandModel>>(this.baseURL, { params: { page, pageSize, column, direction } });
  }

  getByName(names: string): Observable<BrandModel[]> {
    return this.http.get<BrandModel[]>(this.byNameURL, { params: { names } })
  }
}