import { PaginationDto } from "../../../common/dto/pagination.dto";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsOptional } from "class-validator";

enum SortOrder {
    ASC = 'asc',
    DESC = 'desc',
}

export class FilterDisciplineDto extends PaginationDto {
    @ApiPropertyOptional({ enum: SortOrder, description: 'Сортировка по дате создания' })
    @IsOptional()
    @IsEnum(SortOrder)
    sort?: SortOrder = SortOrder.DESC;
}