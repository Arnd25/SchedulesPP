import { ApiProperty } from "@nestjs/swagger";
import { Department, Shift } from "../../../generated/prisma/client";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";

export class CreateGroupDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name!: string;
    @IsEnum(Department)
    @ApiProperty({ enum: Department, default: Department.Финансы })
    department!: Department;
    @IsEnum(Shift)
    @ApiProperty({ enum: Shift, default: Shift.ПЕРВАЯ })
    shift!: Shift;
}
