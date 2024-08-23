import { IsString } from 'class-validator';

export class CreateOwnerDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}
