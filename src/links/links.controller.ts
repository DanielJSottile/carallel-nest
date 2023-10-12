import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { LinksService } from './links.service';
import { Prisma } from '@prisma/client';

@Controller('links')
export class LinksController {
  constructor(private readonly linksService: LinksService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createLinkDto: Prisma.linksCreateInput) {
    return this.linksService.createLink(createLinkDto);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  getAllLinksForUser(@Param('id') id: string) {
    return this.linksService.getLinks({
      where: { user_id: id } as Prisma.linksWhereInput,
    });
  }
}
