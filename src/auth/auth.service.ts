import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private ownerService: UsersService,
    private jwtSerivce: JwtService,
  ) {}

  async signin(username: string, pass: string): Promise<any> {
    const owner = await this.ownerService.findOneByUsername(username);

    // if not found owner throw error
    if (!owner) throw new NotFoundException();

    // if password not match throw not found error(For Security Reasons)
    const isMatch = await bcrypt.compare(pass, owner.password);

    if (!isMatch) throw new NotFoundException();

    const payload = { username: owner.username, id: owner._id };
    const access_token = this.jwtSerivce.sign(payload);
    return { access_token };
  }
}
