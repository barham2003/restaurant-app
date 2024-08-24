import { IsMongoId, IsNotEmpty, IsNumberString, IsString } from "class-validator";

export class CreateItemDto {
  @IsNotEmpty()
  name: string

  @IsNumberString()
  price: string

  @IsNotEmpty()
  @IsString()
  image: string

  @IsNotEmpty()
  @IsMongoId()
  restaurantId: string
}
