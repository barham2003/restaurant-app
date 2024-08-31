import { IsString } from 'class-validator';

export class OtherLanguagesDto {
  @IsString()
  ku: string;

  @IsString()
  ar: string;

  @IsString()
  en: string;
}
