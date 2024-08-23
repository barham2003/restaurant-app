import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Owner } from 'src/owners/schema/owner.schema';

export type RestaurantDocument = HydratedDocument<Restaurant>;

@Schema({ timestamps: true })
export class Restaurant {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  logo: string;


  @Prop({ type: Types.ObjectId, ref: "Owner", required: true })
  owner: Owner;

  @Prop()
  createdAt?: Date;

  @Prop()
  updatedAt?: Date;
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);
