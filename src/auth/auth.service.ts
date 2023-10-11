import { compareSync } from 'bcrypt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { users as User, Prisma } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  comparePasswords(password: string, hash: string) {
    const result = compareSync(password, hash);
    return !!result;
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.getUser({ user_name: username });
    if (user && this.comparePasswords(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login({
    user_name,
    date_created,
    date_modified,
    id,
    links_visited,
    password,
  }) {
    const subject = user_name;
    const payload = { user_id: id };
    if (!this.validateUser(user_name, password)) {
      throw new UnauthorizedException();
    }
    return {
      user: {
        user_name,
        date_created,
        date_modified,
        id,
        links_visited,
      },
      access_token: this.jwtService.sign(payload, {
        subject,
        expiresIn: this.configService.get<string>('jwt.expiry'),
        algorithm: 'HS256',
      }),
    };
  }
}
