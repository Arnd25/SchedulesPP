import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString, IsUUID, Min } from "class-validator";

export class CreatePairDto {
    @IsUUID()
    @ApiProperty()
    teacherId!: string;
    @IsUUID()
    @ApiProperty()
    disciplineId!: string;
    @IsUUID()
    @ApiProperty()
    groupId!: string;
    @IsString()
    @ApiProperty()
    audience!: string;


    @IsInt()
    @Min(0)
    @ApiProperty()
    hours!: number;
}
