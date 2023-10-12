import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ArticlesModule } from './articles/articles.module';
import { AuthModule } from './auth/auth.module';
import { LinksModule } from './links/links.module';
import { APP_GUARD } from '@nestjs/core';
import { ApiKeyGuard } from './api-key.guard';

@Module({
  imports: [UsersModule, ArticlesModule, AuthModule, LinksModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ApiKeyGuard,
    },
  ],
})
export class AppModule {}
