import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

import { BaseSchema, BaseDocument } from 'src/main/base/base.schema';
import { Post } from 'src/domain/schemas/posts/post.schema';

import { UserSettings } from './user-settings.schema';

@Schema()
export class User extends BaseSchema {
  @Prop({ unique: true, required: true })
  username: string;

  @Prop({ required: false })
  displayName?: false;

  @Prop({ required: false })
  avatarUrl?: string;

  @Prop({ type: Types.ObjectId, ref: UserSettings.name })
  settings?: UserSettings;

  @Prop({ type: [{ type: Types.ObjectId, ref: Post.name }] })
  posts?: Post[];
}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = User & BaseDocument;
