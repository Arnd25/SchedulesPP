import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsDateString, IsEnum, IsOptional } from "class-validator";


export class FilterScheduleDto {
    @ApiPropertyOptional({ description: 'Фильтр по группам' })
    @IsOptional()
    groupId?: string;
    @ApiPropertyOptional({ description: 'Фильтр по датам' })
    @IsOptional()
    @IsDateString()
    date?: string;
}