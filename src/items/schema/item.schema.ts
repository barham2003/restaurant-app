import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, HydratedDocument } from 'mongoose';
import { OtherLanguages } from 'src/otherLanguages/otherLanguages.schema';

export type ItemDocument = HydratedDocument<Item>;

@Schema()
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
}

export const ItemSchema = SchemaFactory.createForClass(Item);
