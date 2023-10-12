import { compareSync } from 'bcrypt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { users as User } from '@prisma/client';
import configuration from '../config/configuration';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  comparePasswords(password: string, hash: string) {
    const result = compareSync(password, hash);
    return !!result;
  }

  async validateUser(
    username: string,
    pass: string,
  ): Promise<Omit<User, 'password'>> {
    const user = await this.usersService.getUser({ user_name: username });
    if (!!user && (await this.comparePasswords(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login({ user_name, password }) {
    const subject = user_name;
    const validated = await this.validateUser(user_name, password);
    if (!validated) {
      throw new UnauthorizedException();
    } else {
      const payload = { user_id: validated.id };
      return {
        user: {
          ...validated,
        },
        access_token: this.jwtService.sign(payload, {
          subject,
          expiresIn: configuration().jwt.expiry,
          algorithm: 'HS256',
        }),
      };
    }
  }
}
