import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { hash } from 'bcrypt';
import { users as User, Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getUser(
    userWhereUniqueInput: Prisma.usersWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.users.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async createUser(data: Prisma.usersCreateInput): Promise<User> {
    if (await this.getUser({ user_name: data.user_name })) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: 'User already exists',
          message:
            'A user with the provided username already exists in the system.',
        },
        HttpStatus.CONFLICT,
      );
    }
    const pw = (await hash(data.password, 12)) as string;
    return this.prisma.users.create({
      data: { ...data, password: pw },
    });
  }

  /** unused */
  async getUsers({
    skip,
    limit,
    cursor,
    where,
    orderBy,
  }: {
    skip?: number;
    limit?: number;
    cursor?: Prisma.usersWhereUniqueInput;
    where?: Prisma.usersWhereInput;
    orderBy?: Prisma.usersOrderByWithRelationInput;
  } = {}): Promise<User[]> {
    return this.prisma.users.findMany({
      skip,
      take: limit,
      cursor,
      where,
      orderBy,
    });
  }

  /** unused */
  async updateUser({
    where,
    data,
  }: {
    where: Prisma.usersWhereUniqueInput;
    data: Prisma.usersUpdateInput;
  }): Promise<User> {
    return this.prisma.users.update({
      data,
      where,
    });
  }

  /** unused */
  async deleteUser(where: Prisma.usersWhereUniqueInput): Promise<User> {
    return this.prisma.users.delete({
      where,
    });
  }
}
