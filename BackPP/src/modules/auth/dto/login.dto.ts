import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'user@example.com', description: 'Email пользователя' })
  @IsEmail({}, { message: 'Некорректный email' })
  email: string;

  @ApiProperty({ example: 'password', description: 'Пароль пользователя' })
  @IsString()
  @MinLength(6, { message: 'Минимальное кол-во символов 6' })
  password: string;
}