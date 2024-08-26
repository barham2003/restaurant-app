import { Module } from '@nestjs/common';
import { OwnersService } from './owners.service';
import { OwnersController } from './owners.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/owner.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
  ],
  controllers: [OwnersController],
  providers: [OwnersService],
  exports: [OwnersService]
})
export class OwnersModule { }
