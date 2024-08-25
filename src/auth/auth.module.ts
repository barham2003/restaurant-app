import { Module } from '@nestjs/common';
import { OwnersModule } from 'src/owners/owners.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [OwnersModule, JwtModule.register({
    global: true,
    secret: 'secretKey',
    signOptions: { expiresIn: '1d' }
  })],
  providers: [AuthService],
  controllers: [AuthController],

})
export class AuthModule { }
