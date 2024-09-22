import { Type } from 'class-transformer';
import {
  IsDefined,
  IsNotEmpty,
  IsNotEmptyObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { OtherLanguagesDto } from 'src/otherLanguages/otherLanguages.dto';

export class AddCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;


  @IsString()
  @IsNotEmpty()
  image: string

  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => OtherLanguagesDto)
  otherLanguages: OtherLanguagesDto;
}
