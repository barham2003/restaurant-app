import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateRestaurantDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  logo: string;

  @IsNotEmpty()
  @IsMongoId()
  ownerId: string;
}
