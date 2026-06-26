import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule } from '@nestjs/config';
import { MulterConfigService } from '../../common/config/multer.config';
import { BlobModule } from '../blob/blob.module';

@Module({
  imports: [
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useClass: MulterConfigService,
    }),
    BlobModule,
    PrismaModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule { }
