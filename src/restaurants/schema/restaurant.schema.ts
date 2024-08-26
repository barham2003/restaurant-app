import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Item } from 'src/items/schema/item.schema';
import { User } from 'src/users/schema/user.schema';

export type RestaurantDocument = HydratedDocument<Restaurant>;

@Schema()
export class Restaurant {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  logo: string;

  @Prop({ type: Types.ObjectId, ref: "Owner", required: true })
  owner: User;

  @Prop({ type: Types.ObjectId, ref: Item.name })
  items: Types.ObjectId[]

  @Prop()
  createdAt?: Date;

  @Prop()
  updatedAt?: Date;
}

const unPreparedSchema = SchemaFactory.createForClass(Restaurant)


export const RestaurantSchema = unPreparedSchema

