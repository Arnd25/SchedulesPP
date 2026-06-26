import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsArray, IsEnum, IsOptional } from "class-validator";
import { Department } from "src/generated/prisma/enums";

export class CreateTeacherDto {
    @ApiProperty()
    @IsString()
    name!: string;

    @ApiProperty({ enum: Department, default: Department.Финансы})
    @IsEnum(Department)
    department!: Department;

    @ApiProperty({ type: [String] })
    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    mainDisciplines?: string[];

    @ApiProperty({ type: [String] })
    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    additionalDisciplines?: string[];
}