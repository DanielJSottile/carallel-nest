import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, catchError } from 'rxjs';
import { AxiosError } from 'axios';
import configuration from '../config/configuration';
import { Article } from './articles.interface';
import { ArticleData } from './articleData.interface';

@Injectable()
export class ArticlesService {
  constructor(private readonly httpService: HttpService) {}

  private async fetchArticles(page: number) {
    return firstValueFrom(
      this.httpService
        .get<ArticleData>(
          `https://api.thenewsapi.com/v1/news/all?&language=en&limit=3&page=${page}&api_token=${
            configuration().news.key
          }`,
        )
        .pipe(
          catchError((error: AxiosError) => {
            console.error(error.response.data);
            throw 'An error happened!';
          }),
        ),
    );
  }

  private async fetchRelatedArticles(id: string, page: number) {
    return firstValueFrom(
      this.httpService
        .get<ArticleData>(
          `https://api.thenewsapi.com/v1/news/similar/${id}?language=en&limit=3&page=${page}&api_token=${
            configuration().news.key
          }`,
        )
        .pipe(
          catchError((error: AxiosError) => {
            console.error(error.response.data);
            throw 'An error happened!';
          }),
        ),
    );
  }

  /**
   * Because I am rate limited to 3 articles at a time,
   * I want slightly more than that for my home page.
   * This code loops and gets additional 'pages' so I have
   * a list of 12 instead of 3.
   * @returns
   */
  async findAll(): Promise<Article[]> {
    const all = [];

    for (let i = 1; i < 5; i++) {
      const {
        data: { data },
      } = await this.fetchArticles(i);
      all.push(data);
    }

    return all.flat();
  }

  async findRelatedArticles(id: string): Promise<Article[]> {
    const all = [];

    for (let i = 1; i < 3; i++) {
      /** can only fetch 3 at a time, cannot get all, but 6 should work */
      const {
        data: { data },
      } = await this.fetchRelatedArticles(id, i);
      all.push(data);
    }

    return all.flat();
  }

  async findOne(id: string) {
    const { data } = await firstValueFrom(
      this.httpService
        .get<Article>(
          `https://api.thenewsapi.com/v1/news/uuid/${id}?api_token=${
            configuration().news.key
          }`,
        )
        .pipe(
          catchError((error: AxiosError) => {
            console.error(error.response.data);
            throw 'An error happened!';
          }),
        ),
    );
    return data;
  }
}
