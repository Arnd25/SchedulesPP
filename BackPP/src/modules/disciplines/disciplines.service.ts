import { ConflictException, Injectable } from '@nestjs/common';
import { CreateDisciplineDto } from './dto/create-discipline.dto';
import { UpdateDisciplineDto } from './dto/update-discipline.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DisciplinesService {
  constructor(
    private readonly prisma: PrismaService
  ) { }
  async count() {
    return this.prisma.discipline.count()
  }
  async create(dto: CreateDisciplineDto) {
    const exist = await this.prisma.discipline.findFirst({
      where: {
        name: dto.name,
      }
    });
    if (exist) throw new ConflictException("дисциплина с таким названием уже существует")
    return this.prisma.discipline.create({
      data: dto
    })
  }

  async findAll() {
    return this.prisma.discipline.findMany()
  }

  async findOne(id: string) {
    const exist = await this.prisma.discipline.findFirst({
      where: { id }
    });
    if (!exist) throw new ConflictException("дисциплины с таким названием не существует")
    return exist
  }

  async update(id: string, dto: UpdateDisciplineDto) {
    const exist = await this.prisma.discipline.findFirst({
      where: { id }
    });
    if (!exist) throw new ConflictException("дисциплины с таким названием не существует")
    return this.prisma.discipline.update({
      where: { id },
      data: dto
    })
  }

  async remove(id: string) {
    const exist = await this.prisma.discipline.findFirst({
      where: { id }
    });
    if (!exist) throw new ConflictException("дисциплины с таким названием не существует")
    return this.prisma.discipline.delete({
      where: { id }
    })
  }

  private sanitizeDescipline(data: any) {
    return {
      id: data.id,
      name: data.name,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }
}
