import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Item } from 'src/items/schema/item.schema';
import { User } from 'src/users/schema/user.schema';
import { OtherLanguages } from 'src/otherLanguages/otherLanguages.schema';

export type RestaurantDocument = HydratedDocument<Restaurant>;

@Schema()
class Category {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, type: OtherLanguages })
  otherLanguages: OtherLanguages;
}

@Schema()
export class Restaurant {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  logo: string;

  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  user: User;

  @Prop({ type: [Types.ObjectId], ref: Item.name })
  items: Types.ObjectId[] | Item[];

  @Prop({
    type: [Category],
    default: [],
  })
  categories: Category[];

  @Prop()
  createdAt?: Date;

  @Prop()
  updatedAt?: Date;
}
export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);

RestaurantSchema.pre('findOne', function () {
  this.populate('items');
});


