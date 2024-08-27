import { IsString } from 'class-validator';
import { Role } from 'src/roles/roles.enum';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}
