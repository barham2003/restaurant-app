import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private ownerService: UsersService,
    private jwtSerivce: JwtService) { }

  async signin(username: string, pass: string): Promise<any> {
    const owner = await this.ownerService.findOneByUsername(username)

    if (!owner) throw new NotFoundException()

    if (owner?.password !== pass) throw new UnauthorizedException()

    const payload = { username: owner.username, id: owner._id }
    const access_token = this.jwtSerivce.sign(payload)
    return { access_token }
  }

}
