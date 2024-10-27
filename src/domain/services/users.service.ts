import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  UserSettings,
  UserSettingsDocument,
} from 'src/domain/schemas/users/user-settings.schema';

import { User, UserDocument } from 'src/domain/schemas/users/user.schema';

import { ReadUserDto } from 'src/presentation/dtos/users/read-user.dto';
import { CreateUserDto } from 'src/presentation/dtos/users/create-user.dto';
import { UpdateUserDto } from 'src/presentation/dtos/users/update-user.dto';

import { notFoundValidateReturn } from 'src/main/utils/not-found.validate';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(UserSettings.name)
    private userSettingsModel: Model<UserSettingsDocument>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<ReadUserDto> {
    const { settings, ...restCreateUserDto } = createUserDto;
    if (settings) {
      const newSettings = new this.userSettingsModel(restCreateUserDto);
      const savedNewSettings = await newSettings.save();
      restCreateUserDto['settings'] = savedNewSettings._id;
    }

    const newUser = new this.userModel(restCreateUserDto);
    const savedUser = await newUser.save();
    return savedUser.toObject();
  }

  async getsUsers(): Promise<ReadUserDto[]> {
    return await this.userModel.find().populate(['settings', 'posts']).exec();
  }

  async getUserById(id: string): Promise<ReadUserDto> {
    const findUser = await this.userModel
      .findById(id)
      .populate('settings')
      .exec();

    return notFoundValidateReturn(findUser);
  }

  async updateUser(id: string, updateUser: UpdateUserDto) {
    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, updateUser, { new: true })
      .exec();

    return notFoundValidateReturn(updatedUser);
  }

  async deleteUser(id: string): Promise<void> {
    const deletedUser = await this.userModel.findByIdAndDelete(id).exec();
    return notFoundValidateReturn(deletedUser).remove();
  }
}
