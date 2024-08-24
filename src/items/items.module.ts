import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Item, ItemSchema } from './schema/item.schema';
import { RestaurantsModule } from 'src/restaurants/restaurants.module';
import { Restaurant, RestaurantSchema } from 'src/restaurants/schema/restaurant.schema';

@Module({
  controllers: [ItemsController],
  providers: [ItemsService],
  imports: [MongooseModule.forFeature([{ name: Item.name, schema: ItemSchema }, { name: Restaurant.name, schema: RestaurantSchema }])],
})
export class ItemsModule { }
