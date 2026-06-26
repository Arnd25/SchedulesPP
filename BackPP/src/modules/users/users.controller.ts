import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Roles } from '../../common/decorators/roles.decorator';
import { AppRole } from '../../common/types/shared.type';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { FilterUserDto } from './dto/filter-user.dto';
import { ApiBody, ApiConsumes, ApiOperation } from '@nestjs/swagger';
import { IMAGE_VALIDATION } from 'src/common/constants/index.constant';
import { FileInterceptor } from '@nestjs/platform-express';
import { IdParamDto } from 'src/common/dto/id-param.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  @Roles(AppRole.ADMIN)
  @ApiOperation({ summary: 'Список пользователей (с фильтрацией)' })
  async findAll() {
    return this.usersService.findAll();
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Профиль текущего пользователя' })
  async getMe(@CurrentUser('userId') id: string) {
    return this.usersService.findOne(id);
  }
  @Patch('me')
  @Roles(AppRole.ADMIN)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string' },
        password: { type: 'string' },
        firstName: { type: 'string' },
        lastName: { type: 'string' },
        role: { type: 'string', enum: ['USER', 'ADMIN'] },
        file: { type: 'string', format: 'binary' },
      }
    }
  })
  @ApiOperation({ summary: 'обновить текущего пользователя' })
  @UseInterceptors(FileInterceptor('file'))
  async updateMe(@CurrentUser('userId') id: string, @Body() dto: UpdateUserDto, @UploadedFile(IMAGE_VALIDATION) file: Express.Multer.File) {
    return this.usersService.update(id, dto, file);
  }

  @Delete('me')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Удалить текущего пользователя' })
  async deleteMe(@CurrentUser('userId') id: string) {
    return this.usersService.remove(id);
  }

  @Get(':id')
  @Roles(AppRole.ADMIN)
  @ApiOperation({ summary: 'Выбор пользователя по id' })
  async findOne(@Param() params: IdParamDto) {
    return this.usersService.findOne(params.id);
  }

  @Post()
  @Roles(AppRole.ADMIN)
  @UseInterceptors(FileInterceptor('file'))
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string' },
        password: { type: 'string' },
        fullName: { type: 'string' },
        role: { type: 'string', enum: ['USER', 'ADMIN'] },
        file: { type: 'string', format: 'binary' },
      }
    }
  })
  async create(@Body() dto: CreateUserDto, @UploadedFile(IMAGE_VALIDATION) file: Express.Multer.File) {
    return this.usersService.create(dto, file);
  }

  @ApiOperation({ summary: 'Обновить пользователя' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string' },
        password: { type: 'string' },
        firstName: { type: 'string' },
        lastName: { type: 'string' },
        role: { type: 'string', enum: ['USER', 'ADMIN'] },
        file: { type: 'string', format: 'binary' },
      }
    }
  })
  @Patch(':id')
  @Roles(AppRole.ADMIN)
  @UseInterceptors(FileInterceptor('file'))
  async update(@Param('id') id: string, @Body() dto: UpdateUserDto, @UploadedFile(IMAGE_VALIDATION) file: Express.Multer.File) {
    return this.usersService.update(id, dto, file);
  }

  @Delete(':id')
  @Roles(AppRole.ADMIN)
  @ApiOperation({ summary: 'Удалить пользователя' })
  async delete(@Param() params: IdParamDto) {
    return this.usersService.remove(params.id);
  }
}
