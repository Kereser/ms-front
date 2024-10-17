import { BrandArticleModel } from "./BrandArticleModel";
import { CategoryArticleModel } from "./CategoryArticleModel";

export interface ArticleModel {
    id: number;
    name: string;
    description: string;
    price: number;
    quantity: number;
    updatedAt: Date;
    categories: CategoryArticleModel[];
    brand: BrandArticleModel;
}