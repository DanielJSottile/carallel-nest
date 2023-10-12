import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma.service';
import { users as User, Prisma } from '@prisma/client';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/auth.guard';

describe('UsersService', () => {
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, PrismaService],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  describe('createUser', () => {
    it('should create a User', async () => {
      const createUserDto: Prisma.usersCreateInput = {
        user_name: 'test',
        password: 'test',
      };
      const expectedResult: User = {
        user_name: 'test',
        id: 'test',
        date_created: new Date(),
        date_modified: new Date(),
        first_name: 'test',
        last_name: 'test',
        password: 'test',
      };

      jest
        .spyOn(usersService['prisma'].users, 'create')
        .mockResolvedValue(expectedResult);

      const result = await usersService.createUser(createUserDto);
      expect(result).toBe(expectedResult);
    });
  });

  describe('getUser', () => {
    it('should get User', async () => {
      const id = '1';
      const expectedResult: User = {
        user_name: 'test',
        id: 'test',
        date_created: new Date(),
        date_modified: new Date(),
        first_name: 'test',
        last_name: 'test',
        password: 'test',
      };

      jest
        .spyOn(usersService['prisma'].users, 'findUnique')
        .mockResolvedValue(expectedResult);

      const result = await usersService.getUser({ id });
      expect(result).toEqual(expectedResult);
    });
  });
});
