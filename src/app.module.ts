import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ArticlesModule } from './articles/articles.module';
import { AuthModule } from './auth/auth.module';
import { LinksModule } from './links/links.module';

@Module({
  imports: [UsersModule, ArticlesModule, AuthModule, LinksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
