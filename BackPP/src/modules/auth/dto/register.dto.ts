import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'user@example.com', description: 'Email пользователя' })
  @IsEmail({}, { message: 'Некорректный email' })
  email!: string;
  @IsString({ message: 'Поле пароль должен быть строкой' })
  @MinLength(6, { message: 'Минимальное кол-во символов должно быть равно 6' })
  @MaxLength(12, { message: 'Максимальное кол-во символов должно быть равно 12' })
  @ApiProperty()
  password!: string;
  @IsString({ message: 'Поле имя пользователя - должно быть строкой' })
  @ApiProperty()
  firstName!: string;
  @ApiProperty()
  @IsString({ message: 'Поле фамилия пользователя - должно быть строкой' })
  @ApiProperty()
  lastName!: string;
}