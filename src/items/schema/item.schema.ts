import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, HydratedDocument } from 'mongoose';

export type ItemDocument = HydratedDocument<Item>;

@Schema()
export class Item {
  @Prop({ required: true })
  name: string;

  @Prop({ type: Object, required: false })
  otherLanguages: {
    kurdish: string;
    arabic: string;
  };

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  image: string;

  @Prop({ type: Types.ObjectId, ref: 'Restaurant' })
  restaurant: Types.ObjectId;
}

export const ItemSchema = SchemaFactory.createForClass(Item);
