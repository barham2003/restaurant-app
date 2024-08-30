import { Type } from 'class-transformer';
import {
  IsDefined,
  IsMongoId,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumberString,
  IsString,
  ValidateNested,
} from 'class-validator';
import { OtherLanguagesDto } from 'src/otherLanguages/otherLanguages.dto';

export class CreateItemDto {
  @IsNotEmpty()
  name: string;

  @IsNumberString()
  price: string;

  @IsNotEmpty()
  @IsString()
  image: string;

  @IsNotEmpty()
  @IsMongoId()
  restaurantId: string;

  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => OtherLanguagesDto)
  otherLanguages: OtherLanguagesDto;

  @IsString()
  @IsNotEmpty()
  category: string;
}
