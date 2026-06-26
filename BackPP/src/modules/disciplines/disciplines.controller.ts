import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { DisciplinesService } from './disciplines.service';
import { CreateDisciplineDto } from './dto/create-discipline.dto';
import { UpdateDisciplineDto } from './dto/update-discipline.dto';
import { IdParamDto } from 'src/common/dto/id-param.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { AppRole } from 'src/common/types/shared.type';
import { Roles } from 'src/common/decorators/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(AppRole.ADMIN)
@Controller('disciplines')
export class DisciplinesController {
  constructor(private readonly disciplinesService: DisciplinesService) { }

  @Post()
  create(@Body() createDisciplineDto: CreateDisciplineDto) {
    return this.disciplinesService.create(createDisciplineDto);
  }

  @Get()
  findAll() {
    return this.disciplinesService.findAll();
  }
  @Get('/count')
  Count() {
    return this.disciplinesService.count();
  }

  @Get(':id')
  findOne(@Param() id: IdParamDto) {
    return this.disciplinesService.findOne(id.id);
  }

  @Patch(':id')
  update(@Param() id: IdParamDto, @Body() updateDisciplineDto: UpdateDisciplineDto) {
    return this.disciplinesService.update(id.id, updateDisciplineDto);
  }

  @Delete(':id')
  remove(@Param() id: IdParamDto) {
    return this.disciplinesService.remove(id.id);
  }
}
