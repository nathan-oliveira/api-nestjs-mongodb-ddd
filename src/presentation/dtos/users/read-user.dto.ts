import { OmitType } from '@nestjs/swagger';

import { User } from 'src/domain/schemas/users/user.schema';

export class ReadUserDto extends OmitType(User, []) {}
