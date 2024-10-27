import {
  Controller,
  UseInterceptors,
  ClassSerializerInterceptor,
  Post,
  Body,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';

import { CreatePostDto } from 'src/presentation/dtos/posts/create-post.dto';
import { ReadPostDto } from 'src/presentation/dtos/posts/read-post.dto';

import { PostsService } from 'src/domain/services/posts.service';

@ApiTags('Posts')
@Controller('posts')
@UseInterceptors(ClassSerializerInterceptor)
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Post()
  async createPost(@Body() createPostDto: CreatePostDto): Promise<ReadPostDto> {
    return plainToClass(
      ReadPostDto,
      await this.postsService.createPost(createPostDto),
    );
  }
}
