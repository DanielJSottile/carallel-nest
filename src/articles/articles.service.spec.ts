import { Test, TestingModule } from '@nestjs/testing';
import { ArticlesService } from './articles.service';
import { HttpModule, HttpService } from '@nestjs/axios';
import { AuthGuard } from '../auth/auth.guard';
import { of, Observable } from 'rxjs';
import { Article } from './articles.interface';
import { AxiosResponse } from 'axios';

describe('ArticlesService', () => {
  let articlesService: ArticlesService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [ArticlesService],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    articlesService = module.get<ArticlesService>(ArticlesService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(articlesService).toBeDefined();
  });

  describe('getAllArticles', () => {
    it("should get 'all' articles", async () => {
      const mockArticleData = {
        data: [
          {
            uuid: 'test',
            title: 'test',
            description: 'test',
            keywords: 'test',
            snippet: 'test',
            url: 'test',
            image_url: 'test',
            language: 'test',
            published_at: 'test',
            source: 'test',
            categories: ['test'],
            relevance_score: null,
          },
        ],
      };

      const response: AxiosResponse = {
        data: mockArticleData,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {
          headers: null,
        },
      };

      jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(response));
      articlesService.findAll().then((res) => {
        expect(res).toEqual(mockArticleData);
      });
    });
  });

  describe('getRelatedArticles', () => {
    it('should get related articles', async () => {
      const mockArticleData = {
        data: [
          {
            uuid: 'test',
            title: 'test',
            description: 'test',
            keywords: 'test',
            snippet: 'test',
            url: 'test',
            image_url: 'test',
            language: 'test',
            published_at: 'test',
            source: 'test',
            categories: ['test'],
            relevance_score: null,
          },
        ],
      };

      const response: AxiosResponse = {
        data: mockArticleData,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {
          headers: null,
        },
      };

      jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(response));
      articlesService.findRelatedArticles('1').then((res) => {
        expect(res).toEqual(mockArticleData);
      });
    });
  });

  describe('getSingle', () => {
    it('should get single article of id', async () => {
      const mockArticleData = {
        data: {
          uuid: 'test',
          title: 'test',
          description: 'test',
          keywords: 'test',
          snippet: 'test',
          url: 'test',
          image_url: 'test',
          language: 'test',
          published_at: 'test',
          source: 'test',
          categories: ['test'],
          relevance_score: null,
        },
      };

      const response: AxiosResponse = {
        data: mockArticleData,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {
          headers: null,
        },
      };

      jest
        .spyOn(httpService, 'get')
        .mockReturnValue(of(response) as Observable<AxiosResponse>);

      const result = await articlesService.findOne('1');
      expect(httpService.get).toHaveBeenCalledWith(expect.any(String));
      expect(result).toEqual(mockArticleData);
    });
  });
});
