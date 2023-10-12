import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { links as Link, Prisma } from '@prisma/client';

@Injectable()
export class LinksService {
  constructor(private prisma: PrismaService) {}

  async createLink(data: Prisma.linksCreateInput): Promise<Link> {
    return this.prisma.links.create({
      data,
    });
  }

  async getLinks({
    skip,
    limit,
    cursor,
    where,
    orderBy,
  }: {
    skip?: number;
    limit?: number;
    cursor?: Prisma.linksWhereUniqueInput;
    where?: Prisma.linksWhereInput;
    orderBy?: Prisma.linksOrderByWithRelationInput;
  } = {}): Promise<Link[]> {
    return this.prisma.links.findMany({
      skip,
      take: limit,
      cursor,
      where,
      orderBy,
    });
  }
}
