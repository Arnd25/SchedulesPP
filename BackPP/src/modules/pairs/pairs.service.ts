import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePairDto } from './dto/create-pair.dto';
import { UpdatePairDto } from './dto/update-pair.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PairsService {
  constructor(private readonly prisma: PrismaService) { }
  async create(dto: CreatePairDto) {
    const exist = await this.prisma.pair.findUnique({
      where: {
        teacherId_disciplineId_groupId: {
          teacherId: dto.teacherId,
          disciplineId: dto.disciplineId,
          groupId: dto.groupId,
        }
      }
    })
    if (exist) throw new ConflictException("Пара с такими данными уже существует")
    return this.prisma.pair.create({
      data: {
        ...dto,
        hours: dto.hours,
        remaingHours: dto.hours
      }
    })
  }

  findAll() {
    return this.prisma.pair.findMany({
      include: {
        teacher: true,
        discipline: true,
        group: true,
      },
      orderBy: [
        {
          group: {
            name: 'asc'
          }
        },
        {
          teacher: {
            name: 'asc'
          }
        }
      ]
    });
  }

  async findOne(id: string) {
    const exist = await this.prisma.pair.findUnique({
      where: {
        id
      }
    })
    if (!exist) throw new NotFoundException()
    return exist
  }
  async update(id: string, dto: UpdatePairDto) {
    const exist = await this.prisma.pair.findUnique({
      where: {
        id
      }
    })
    if (!exist) throw new NotFoundException();
    return this.prisma.pair.update({
      where: { id },
      data: {
        ...dto,
        ...(dto?.hours !== undefined && { remaingHours: dto.hours }),
      },
    })
  }

  async remove(id: string) {
    const exist = await this.prisma.pair.findUnique({
      where: {
        id
      }
    })
    if (!exist) throw new NotFoundException()
    return this.prisma.pair.delete({
      where: { id }
    })
  }
}
