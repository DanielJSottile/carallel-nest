import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/auth.guard';
import { users as User, Prisma } from '.prisma/client';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService, PrismaService],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
    expect(usersService).toBeDefined();
  });

  describe('create', () => {
    it('should create a link', async () => {
      const createUserDto: Prisma.usersCreateInput = {
        user_name: 'test',
        password: 'test',
      };
      const expectedResult = {
        user_name: 'test',
        id: 'test',
        date_created: new Date(),
        date_modified: new Date(),
        first_name: 'test',
        last_name: 'test',
        password: 'test',
      };

      jest.spyOn(usersService, 'createUser').mockResolvedValue(expectedResult);

      const result = await usersController.create(createUserDto);
      expect(result).toBe(expectedResult);
    });
  });

  describe('getUser', () => {
    it('should get a user', async () => {
      const userId = '1';
      const expectedResult: User = {
        user_name: 'test',
        id: 'test',
        date_created: new Date(),
        date_modified: new Date(),
        first_name: 'test',
        last_name: 'test',
        password: 'test',
      };

      jest.spyOn(usersService, 'getUser').mockResolvedValue(expectedResult);

      const result = await usersController.getUser({ id: userId });
      expect(result).toEqual(expectedResult);
    });
  });
});
