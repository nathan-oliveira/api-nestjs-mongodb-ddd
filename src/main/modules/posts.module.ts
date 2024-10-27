import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Post, PostSchema } from 'src/domain/schemas/posts/post.schema';
import { User, UserSchema } from 'src/domain/schemas/users/user.schema';

import { PostsController } from 'src/presentation/controllers/posts.controller';
import { PostsService } from 'src/domain/services/posts.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Post.name, schema: PostSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [PostsController],
  providers: [PostsService],
  exports: [],
})
export class PostsModule {}
