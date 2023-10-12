import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { users as User } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(
    @Body()
    signInDto: Omit<
      User,
      'id' | 'date_created' | 'date_modified' | 'first_name' | 'last_name'
    >,
  ) {
    return this.authService.login(signInDto);
  }
}
