import { Test, TestingModule } from '@nestjs/testing';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { AuthGuard } from '../auth/auth.guard';
import { HttpModule } from '@nestjs/axios';
import { Article } from './articles.interface';

describe('ArticlesController', () => {
  let articlesController: ArticlesController;
  let articlesService: ArticlesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [ArticlesController],
      providers: [ArticlesService],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    articlesController = module.get<ArticlesController>(ArticlesController);
    articlesService = module.get<ArticlesService>(ArticlesService);
  });

  it('should be defined', () => {
    expect(articlesController).toBeDefined();
    expect(articlesService).toBeDefined();
  });

  describe('findAll', () => {
    it("it should get 'all' articles", async () => {
      const expectedResult: Article[] = [
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
      ];

      jest.spyOn(articlesService, 'findAll').mockResolvedValue(expectedResult);

      const result = await articlesController.findAll();
      expect(result).toEqual(expectedResult);
    });
  });

  describe('getRelatedArticles', () => {
    it('should get all related articles given an id', async () => {
      const articleId = '1';
      const expectedResult: Article[] = [
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
      ];

      jest
        .spyOn(articlesService, 'findRelatedArticles')
        .mockResolvedValue(expectedResult);

      const result = await articlesController.findRelated(articleId);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('getSingleArticle', () => {
    it('should get the article given an id', async () => {
      const articleId = '1';
      const expectedResult: Article = {
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
      };

      jest.spyOn(articlesService, 'findOne').mockResolvedValue(expectedResult);

      const result = await articlesController.findOne(articleId);
      expect(result).toEqual(expectedResult);
    });
  });
});
