import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsDateString, Min, Max } from 'class-validator';

export class CreateScheduleDto {
  @ApiProperty()
  @IsString()
  pairId!: string;

  @ApiProperty({ example: '2026-06-17' })
  @IsDateString()
  date!: string;

  @ApiProperty({ minimum: 1, maximum: 7 })
  @IsInt()
  @Min(1)
  @Max(7)
  lessonNumber!: number;
}