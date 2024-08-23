import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document, HydratedDocument, Types } from "mongoose";
import { Restaurant } from "src/restaurants/schema/restaurant.schema";

export type OwnersDocument = HydratedDocument<Owner>

@Schema({ timestamps: true })
export class Owner extends Document {

  @Prop({ required: true })
  username: string;


  @Prop({ required: true })
  password: string;


  @Prop({ type: Types.ObjectId, ref: "Restaurant", })
  restaurants: Types.ObjectId[]


  @Prop()
  createdAt?: Date

  @Prop()
  updatedAt?: Date
}

export const OwnerSchema = SchemaFactory.createForClass(Owner);
