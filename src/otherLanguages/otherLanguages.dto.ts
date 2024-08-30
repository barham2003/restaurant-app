import { IsString } from 'class-validator';

export class OtherLanguagesDto {
  @IsString()
  kurdish: string;

  @IsString()
  arabic: string;
}
