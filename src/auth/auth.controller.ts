import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';
import { AuthGuard } from './auth.guard';
import { Response } from 'express';
import { Public } from 'src/common/public-route.pipe';

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('/signin')
  async signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.signin(
      signInDto.username,
      signInDto.password,
    );

    res.cookie('token', result.access_token, {
      path: '/',
      httpOnly: true,
      secure: true,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    });
    return result;
  }

  @Get('profile')
  @UseGuards(AuthGuard)
  profile(@Req() request: any) {
    return request.user;
  }
}
