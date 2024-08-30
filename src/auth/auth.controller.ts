import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';
import { Public } from 'src/common/public-route.pipe';

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('/signin')
  async signIn(@Body() signInDto: SignInDto) {
    const result = await this.authService.signin(
      signInDto.username,
      signInDto.password,
    );

    return result;
  }

  @Get('profile')
  profile(@Req() request: any) {
    return request.user;
  }
}
