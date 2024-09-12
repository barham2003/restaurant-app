import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, HydratedDocument } from 'mongoose';
import { OtherLanguages } from 'src/otherLanguages/otherLanguages.schema';
import { Category } from 'src/restaurants/schema/restaurant.schema';

export type ItemDocument = HydratedDocument<Item>;

@Schema({ timestamps: true })
export class Item {
  @Prop({ required: true })
  name: string;

  @Prop({ type: OtherLanguages, required: true })
  otherLanguages: OtherLanguages;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  image: string;

  @Prop({ type: Types.ObjectId, ref: 'Restaurant' })
  restaurant: Types.ObjectId;

  @Prop({ type: Object, required: true })
  category: Category;

  @Prop({ type: Date, default: new Date() })
  cratedAt?: Date

  @Prop({ type: Date, default: new Date() })
  updatedAt?: Date
}

export const ItemSchema = SchemaFactory.createForClass(Item);
