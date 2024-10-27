import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Post, PostDocument } from 'src/domain/schemas/posts/post.schema';
import { User, UserDocument } from 'src/domain/schemas/users/user.schema';

import { CreatePostDto } from 'src/presentation/dtos/posts/create-post.dto';
import { ReadPostDto } from 'src/presentation/dtos/posts/read-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async createPost(createPostDto: CreatePostDto): Promise<ReadPostDto> {
    const { userId, ...restCreatePostDto } = createPostDto;
    const findUser = await this.userModel.findById(userId).exec();
    if (!findUser)
      throw new HttpException('user not found', HttpStatus.NOT_FOUND);

    const newPost = new this.postModel(restCreatePostDto);
    const savedPost = await newPost.save();

    await findUser
      .updateOne({
        $push: { posts: savedPost._id },
      })
      .exec();

    return savedPost.toObject();
  }
}
