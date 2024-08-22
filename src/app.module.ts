import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ResturantsModule } from './resturants/resturants.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configurations from './config/configurations';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ResturantsModule,
    ConfigModule.forRoot({
      load: [configurations],
      isGlobal: true
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DB_URL'),
      }),
      inject: [ConfigService]
    })
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
