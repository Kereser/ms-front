import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PageDTO } from "src/app/shared/models/PageDTO";
import { ArticleModel } from "../../models/ArticleModel";

@Injectable({
    providedIn: 'root'
})
export class ArticleService {

    private baseURL = "http://localhost:8080/stock/articles";

    constructor (private http: HttpClient) {}

    getArticles(page: number, size: number): Observable<PageDTO<ArticleModel>> {
        const params = new HttpParams().set("page", page).set("pageSize", size);

        return this.http.get<PageDTO<ArticleModel>>(this.baseURL, { params });
    }
}