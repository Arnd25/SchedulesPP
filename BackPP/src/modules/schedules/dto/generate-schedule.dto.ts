import { ApiProperty } from '@nestjs/swagger'
import { IsDateString, IsString } from 'class-validator'

export class GenerateScheduleDto {
    @IsString()
    @ApiProperty()
    groupId!: string

    @IsDateString()
    @ApiProperty()
    date!: string
}