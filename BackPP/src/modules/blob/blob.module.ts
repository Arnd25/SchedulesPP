import { Module } from '@nestjs/common';
import { BlobService } from './blob.service';
import { BlobController } from './blob.controller';
import { MulterModule } from '@nestjs/platform-express';
import { MulterConfigService } from '../../common/config/multer.config';

@Module({
  imports: [
    MulterModule.registerAsync({
      useClass: MulterConfigService,
    }),
  ],
  controllers: [BlobController],
  providers: [BlobService],
  exports: [BlobService]
})
export class BlobModule { }
