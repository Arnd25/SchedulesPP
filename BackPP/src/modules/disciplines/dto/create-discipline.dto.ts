import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateDisciplineDto {
    @ApiProperty()
    @IsString()
    name!: string;
}
