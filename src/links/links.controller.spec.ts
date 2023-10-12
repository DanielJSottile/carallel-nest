import { Test, TestingModule } from '@nestjs/testing';
import { LinksController } from './links.controller';
import { LinksService } from './links.service';
import { AuthGuard } from '../auth/auth.guard';
import { PrismaService } from '../prisma.service';
import { links as Link, Prisma } from '@prisma/client';

describe('LinksController', () => {
  let linkController: LinksController;
  let linksService: LinksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LinksController],
      providers: [LinksService, PrismaService],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    linkController = module.get<LinksController>(LinksController);
    linksService = module.get<LinksService>(LinksService);
  });

  it('should be defined', () => {
    expect(linkController).toBeDefined();
  });

  describe('create', () => {
    it('should create a link', async () => {
      const createLinkDto: Prisma.linksCreateInput = {
        url: 'testing pls',
        users: {
          connect: {
            id: 'test',
          },
        },
      };
      const expectedResult: Link = {
        link_id: '',
        url: 'testing pls',
        user_id: 'test',
        timestamp: new Date(),
      };

      jest.spyOn(linksService, 'createLink').mockResolvedValue(expectedResult);

      const result = await linkController.create(createLinkDto);
      expect(result).toBe(expectedResult);
    });
  });

  describe('getAllLinksForUser', () => {
    it('should get all links for a user', async () => {
      const userId = '1';
      const expectedResult: Link[] = [
        {
          link_id: '',
          url: 'testing pls',
          user_id: 'test',
          timestamp: new Date(),
        },
      ];

      jest.spyOn(linksService, 'getLinks').mockResolvedValue(expectedResult);

      const result = await linkController.getAllLinksForUser(userId);
      expect(result).toEqual(expectedResult);
    });
  });
});
