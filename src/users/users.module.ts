import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { OwnersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
  ],
  controllers: [OwnersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule { }
