import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  /**
   * Route is public, so this is not authenticated and would
   * only provide basic metadata for articles in a real application.
   * */
  @Get()
  findAll() {
    return this.articlesService.findAll();
  }

  /**
   * These routes would provide more context in a real application,
   * but this API I've chosen is limited on content.
   */

  @Get('related/:id')
  @UseGuards(AuthGuard)
  findRelated(@Param('id') id: string) {
    return this.articlesService.findRelatedArticles(id);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string) {
    return this.articlesService.findOne(id);
  }
}
