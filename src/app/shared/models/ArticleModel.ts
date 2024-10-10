import { BrandArticleModel } from "./BrandArticleModel";
import { CategoryArticleModel } from "./CategoryArticleModel";

export interface ArticleModel {
    id: Number;
    name: String;
    description: String;
    price: Number;
    quantity: Number;
    updatedAt: Date;
    categories: CategoryArticleModel[];
    brand: BrandArticleModel;
}