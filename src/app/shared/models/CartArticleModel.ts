import { ArticleModel } from './ArticleModel';

export interface CartArticleModel extends ArticleModel {
  cartQuantity: number;
}
