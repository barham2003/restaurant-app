import { Schema, Prop } from '@nestjs/mongoose';

@Schema()
export class OtherLanguages {
  @Prop()
  ku: string;

  @Prop()
  ar: string;
}
