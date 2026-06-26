import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsString, MaxLength, MinLength } from 'class-validator';
import { Role } from 'src/generated/prisma';

export class CreateUserDto {
  @IsEmail({}, { message: 'Введите корректный email' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'Минимальная длина пароля 6 символов' })
  @MaxLength(12, { message: 'Максимальная длина пароля 12 символов' })
  password: string;

  @IsString()
  @ApiProperty()
  firstName: string;
  @IsString()
  @ApiProperty()
  lastName: string;


  @IsEnum(Role, { message: 'Роль должна быть одной из следующих: USER или ADMIN' })
  role: Role;
}