import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IsNotEmpty, IsString } from 'class-validator';

export type ResturantDocument = HydratedDocument<Resturant>;

@Schema({ timestamps: true })
export class Resturant {
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
  image: string



  @Prop()
  createdAt?: Date

  @Prop()
  updatedAt?: Date
}


export const ResturantSchema = SchemaFactory.createForClass(Resturant);
