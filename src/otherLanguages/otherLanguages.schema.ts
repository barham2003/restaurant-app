import { Schema, Prop } from '@nestjs/mongoose';

@Schema()
export class OtherLanguages {
  @Prop()
  kurdish: string;

  @Prop()
  arabic: string;
}
