import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IsNotEmpty, IsString } from 'class-validator';

export type RestaurantDocument = HydratedDocument<Restaurant>;

@Schema({ timestamps: true })
export class Restaurant {
  @IsString()
  @IsNotEmpty()
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  address: string;

  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  image: string;

  @Prop()
  createdAt?: Date;

  @Prop()
  updatedAt?: Date;
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);
