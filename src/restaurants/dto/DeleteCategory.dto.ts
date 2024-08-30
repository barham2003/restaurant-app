import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
