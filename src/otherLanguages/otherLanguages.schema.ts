import { Schema, Prop } from '@nestjs/mongoose';

@Schema()
export class OtherLanguages {
  @Prop({ required: true })
  kurdish: string;

  @Prop({ required: true })
  arabic: string;
}
