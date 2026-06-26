import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from '../prisma/prisma.module';
import { MulterModule } from '@nestjs/platform-express';
import { MulterConfigService } from 'src/common/config/multer.config';

@Module({
  imports: [
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useClass: MulterConfigService,
    }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_ACCESS_SECRET') as any,
        signOptions: {
          expiresIn: configService.get<string>('JWT_ACCESS_EXPIRES_IN') as any,
        },
      }),
    }),
    PrismaModule,
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule { }
