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
import { AllExceptionsFilter } from './common/all-exception.filter';
import { FilesModule } from './files/files.module';

@Module({
  imports: [
    RestaurantsModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
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
    FilesModule,
    JwtModule,
  ],
  providers: [
    { useClass: AuthGuard, provide: APP_GUARD },
    { useClass: SetResponseInterceptor, provide: APP_INTERCEPTOR },
    { useClass: ValidationPipe, provide: APP_PIPE },
    { useClass: HttpExceptionFilter, provide: APP_FILTER },
    { useClass: AllExceptionsFilter, provide: APP_FILTER },
  ],
})
export class AppModule {}
