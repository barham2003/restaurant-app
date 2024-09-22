import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateRestaurantDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  logo: string;

  @IsNotEmpty()
  @IsMongoId()
  userId: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  color: string;

  @IsOptional()
  @IsString()
  facebook?: string

  @IsOptional()
  @IsString()
  instagram?: string
}
