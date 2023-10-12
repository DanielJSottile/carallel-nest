import { Article } from './articles.interface';

export interface ArticleData {
  meta: {
    found: number;
    returned: number;
    limit: number;
    page: number;
  };
  data: Article[];
}
