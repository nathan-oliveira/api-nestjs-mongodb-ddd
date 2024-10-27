import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  UserSettingsSchema,
  UserSettings,
} from 'src/domain/schemas/users/user-settings.schema';
import { User, UserSchema } from 'src/domain/schemas/users/user.schema';

import { UsersService } from 'src/domain/services/users.service';
import { UsersController } from 'src/presentation/controllers/users.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: UserSettings.name, schema: UserSettingsSchema },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [],
})
export class UsersModule {}
