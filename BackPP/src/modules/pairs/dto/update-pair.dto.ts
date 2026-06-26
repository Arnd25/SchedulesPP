import { PartialType } from '@nestjs/swagger';
import { CreatePairDto } from './create-pair.dto';

export class UpdatePairDto extends PartialType(CreatePairDto) {}
