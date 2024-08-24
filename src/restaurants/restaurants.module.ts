import { Module } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { RestaurantsController } from './restaurants.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Restaurant, RestaurantSchema } from 'src/restaurants/schema/restaurant.schema';
import { Item, ItemSchema } from 'src/items/schema/item.schema';
import { Owner, OwnerSchema } from 'src/owners/schema/owner.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Restaurant.name, schema: RestaurantSchema },
      { name: Item.name, schema: ItemSchema },
      { name: Owner.name, schema: OwnerSchema },
    ]),
  ],
  controllers: [RestaurantsController],
  providers: [RestaurantsService],
})
export class RestaurantsModule { }
