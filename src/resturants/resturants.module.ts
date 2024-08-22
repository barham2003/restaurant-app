import { Module } from '@nestjs/common';
import { ResturantsService } from './resturants.service';
import { ResturantsController } from './resturants.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Resturant, ResturantSchema } from 'src/schemas/resturant.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Resturant.name, schema: ResturantSchema }])],
  controllers: [ResturantsController],
  providers: [ResturantsService],
})
export class ResturantsModule { }
