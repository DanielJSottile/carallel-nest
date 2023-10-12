import { Test, TestingModule } from '@nestjs/testing';
import { LinksService } from './links.service';
import { PrismaService } from '../prisma.service';
import { links as Link, Prisma } from '@prisma/client';

describe('LinksService', () => {
  let linksService: LinksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LinksService, PrismaService],
    }).compile();

    linksService = module.get<LinksService>(LinksService);
  });

  it('should be defined', () => {
    expect(linksService).toBeDefined();
  });

  describe('createLink', () => {
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

      jest
        .spyOn(linksService['prisma'].links, 'create')
        .mockResolvedValue(expectedResult);

      const result = await linksService.createLink(createLinkDto);
      expect(result).toBe(expectedResult);
    });
  });

  describe('getLinks', () => {
    it('should get links', async () => {
      const query: Prisma.linksWhereInput = {
        user_id: '1',
      };
      const expectedResult: Link[] = [
        {
          link_id: '',
          url: 'testing pls',
          user_id: 'test',
          timestamp: new Date(),
        },
      ];

      jest
        .spyOn(linksService['prisma'].links, 'findMany')
        .mockResolvedValue(expectedResult);

      const result = await linksService.getLinks({ where: query });
      expect(result).toEqual(expectedResult);
    });
  });
});
