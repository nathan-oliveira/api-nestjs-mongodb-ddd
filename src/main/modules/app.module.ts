import { Module } from '@nestjs/common';

import { MongoModule } from 'src/infrastructure/database/mongo.module';
import { EnvironmentModule } from 'src/infrastructure/settings/environment.module';

import { UsersModule } from './users.module';
import { PostsModule } from './posts.module';

@Module({
  imports: [EnvironmentModule, MongoModule, UsersModule, PostsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
