import { Module } from '@nestjs/common';
import { RestaurantsModule } from 'src/restaurants/restaurants.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { ItemsModule } from './items/items.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { HttpExceptionFilter } from './common/http-exception.filter';
import { AuthGuard } from './auth/auth.guard';
import { SetResponseInterceptor } from './common/response.interceptor';
import { ValidationPipe } from '@nestjs/common';

@Module({
  imports: [
    RestaurantsModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DB_URL'),
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    ItemsModule,
    AuthModule,
    JwtModule,
  ],
  providers: [
    { useClass: AuthGuard, provide: APP_GUARD },
    { useClass: SetResponseInterceptor, provide: APP_INTERCEPTOR },
    { useClass: ValidationPipe, provide: APP_PIPE },
    { useClass: HttpExceptionFilter, provide: APP_FILTER },
  ],
})
export class AppModule { }
