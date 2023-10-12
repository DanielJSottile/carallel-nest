import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import configuration from '../config/configuration';
import { UsersModule } from '../users/users.module';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          global: true,
          secret: configuration().jwt.secret,
          signOptions: { expiresIn: '60s' },
        }),
        UsersModule,
      ],
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            constructor: jest.fn(),
            login: jest.fn(),
          },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
    expect(authService).toBeDefined();
  });

  describe('login', () => {
    it('should return access_token', async () => {
      jest.spyOn(authService, 'login').mockResolvedValue({
        user: {
          user_name: 'test',
          id: 'test',
          date_created: new Date(),
          date_modified: new Date(),
          first_name: 'test',
          last_name: 'test',
        },
        access_token: 'test',
      });

      const result = await authController.signIn({
        user_name: 'test',
        password: 'test',
      });
      expect(result).toBeTruthy();
      expect(authService.login).toBeCalled();
    });
  });
});
