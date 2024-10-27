import { OmitType } from '@nestjs/swagger';

import { Post } from 'src/domain/schemas/posts/post.schema';

export class ReadPostDto extends OmitType(Post, []) {}
