import { Module } from '@nestjs/common';
import { PairsService } from './pairs.service';
import { PairsController } from './pairs.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [PairsController],
  providers: [PairsService],
  imports: [PrismaModule]
})
export class PairsModule { }
