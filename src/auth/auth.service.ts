import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { OwnersService } from 'src/owners/owners.service';

@Injectable()
export class AuthService {
  constructor(
    private ownerService: OwnersService,
    private jwtSerivce: JwtService) { }

  async signin(username: string, pass: string): Promise<any> {
    const owner = await this.ownerService.findOneByUsername(username)
    if (!owner) throw new NotFoundException()
    if (owner?.password !== pass) {
      throw new UnauthorizedException()
    }
    const payload = { username: owner.username, sub: owner._id }
    return { access_token: this.jwtSerivce.sign(payload) }
  }

}
