import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { PrismaService } from '../prisma/prisma.service';
import { FilterScheduleDto } from './dto/filter-schedule.dto';
import { Prisma } from '../../generated/prisma/client';
import { GenerateScheduleDto } from './dto/generate-schedule.dto';

@Injectable()
export class SchedulesService {
  constructor(private readonly prisma: PrismaService) { }

  async create(dto: CreateScheduleDto) {
    const date = new Date(dto.date)
    const exist = await this.prisma.schedule.findUnique({
      where: {
        pairId_date_lessonNumber: {
          pairId: dto.pairId,
          date: date,
          lessonNumber: dto.lessonNumber,
        },
      },
    });
    if (exist) throw new ConflictException('Расписание на этот слот уже существует')

    const pair = await this.prisma.pair.findUnique({
      where: { id: dto.pairId },
      include: { group: true }
    });
    if (!pair) throw new NotFoundException('Пара не найдена');

    const schedule = await this.prisma.$transaction(async (tx) => {
      await tx.pair.update({
        where: { id: dto.pairId },
        data: { remaingHours: pair.remaingHours - 2 },
      });

      return tx.schedule.create({
        data: {
          pairId: dto.pairId,
          date,
          groupId: pair.groupId,
          lessonNumber: dto.lessonNumber,
        },
        include: {
          pair: {
            include: {
              teacher: true,
              discipline: true,
            },
          },
        },
      });
    });
    return schedule
  }

  findAll(query: FilterScheduleDto) {
    const { groupId, date } = query;

    const where: Prisma.ScheduleWhereInput = {
      ...(groupId && { groupId }),
    };

    if (date) {
      const targetDate = new Date(date);

      const startOfDay = new Date(targetDate);
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date(targetDate);
      endOfDay.setHours(23, 59, 59, 999);

      where.date = {
        gte: startOfDay,
        lte: endOfDay,
      };
    }

    return this.prisma.schedule.findMany({
      where,
      include: {
        pair: {
          include: {
            teacher: {
              select: { id: true, name: true },
            },
            discipline: {
              select: { id: true, name: true },
            },
            group: {
              select: { id: true, name: true },
            },
          },
        },
        group: {
          select: { id: true, name: true },
        },
      },
      orderBy: [
        { date: 'asc' },
        { lessonNumber: 'asc' },
      ],
    });
  }

  findOne(id: string) {
    return this.prisma.schedule.findUnique({
      where: { id },
      include: {
        pair: {
          include: {
            teacher: true,
            discipline: true,
          },
        },
      },
    });
  }

  async generate(dto: GenerateScheduleDto) {
    const { groupId, date } = dto


    const group = await this.prisma.group.findUnique({
      where: { id: groupId },
    })

    if (!group) {
      throw new NotFoundException('Группа не найдена')
    }

    const isSecondShift = group.shift === 'ВТОРАЯ'
    const startLesson = isSecondShift ? 4 : 1
    const maxLessonsPerDay = 4

    const slots: number[] = []
    for (let i = startLesson; i < startLesson + maxLessonsPerDay && i <= 7; i++) {
      slots.push(i)
    }

    const availablePairs = await this.prisma.pair.findMany({
      where: {
        groupId,
        remaingHours: { gt: 0 },
      },
      orderBy: {
        remaingHours: 'desc',
      },
    })

    if (availablePairs.length === 0) {
      return {
        success: false,
        count: 0,
        message: 'Нет пар с оставшимися часами',
      }
    }

    const occupiedSlots = await this.prisma.schedule.findMany({
      where: {
        date: new Date(date),
        groupId,
      },
      select: { lessonNumber: true },
    })

    const occupiedSet = new Set(occupiedSlots.map(s => s.lessonNumber))
    const freeSlots = slots.filter(slot => !occupiedSet.has(slot))

    if (freeSlots.length === 0) {
      return {
        success: false,
        count: 0,
        message: 'Нет свободных слотов на эту дату',
      }
    }

    const operations: { pairId: string; slot: number }[] = []
    let currentPairIndex = 0

    for (const slot of freeSlots) {
      if (currentPairIndex >= availablePairs.length) break

      const pair = availablePairs[currentPairIndex]

      if (pair.remaingHours < 2) {
        currentPairIndex++
        continue
      }

      operations.push({ pairId: pair.id, slot })

      availablePairs[currentPairIndex] = {
        ...pair,
        remaingHours: pair.remaingHours - 2,
      }
    }

    if (operations.length === 0) {
      return {
        success: false,
        count: 0,
        message: 'Не удалось создать ни одной пары',
      }
    }

    const pairUsageMap = new Map<string, number>()
    for (const op of operations) {
      pairUsageMap.set(op.pairId, (pairUsageMap.get(op.pairId) ?? 0) + 1)
    }

    await this.prisma.$transaction(async (tx) => {
      for (const [pairId, count] of pairUsageMap.entries()) {
        await tx.pair.update({
          where: { id: pairId },
          data: {
            remaingHours: {
              decrement: count * 2,
            },
          },
        })
      }

      await tx.schedule.createMany({
        data: operations.map(op => ({
          pairId: op.pairId,
          groupId: groupId,
          date: new Date(date),
          lessonNumber: op.slot,
        })),
      })
    })

    return {
      success: true,
      count: operations.length,
      message: `Создано ${operations.length} пар`,
    }
  }

  async remove(id: string) {
    const existing = await this.prisma.schedule.findUnique({
      where: { id },
    })

    if (!existing) {
      throw new NotFoundException('Расписание не найдено')
    }

    const result = await this.prisma.$transaction(async (tx) => {
      // 1. Находим пару
      const pair = await tx.pair.findUnique({
        where: { id: existing.pairId }
      })

      // 2. Возвращаем часы
      if (pair) {
        await tx.pair.update({
          where: { id: existing.pairId },
          data: {
            remaingHours: pair.remaingHours + 2
          }
        })
      }

      return tx.schedule.delete({
        where: { id },
      })
    })

    return result
  }

  async deleteGroupSchedule(groupId: string, date: string) {
    const group = await this.prisma.group.findUnique({
      where: { id: groupId },
    })

    if (!group) {
      throw new NotFoundException('Группа не найдена')
    }

    const dateObj = new Date(date)

    const schedules = await this.prisma.schedule.findMany({
      where: {
        date: dateObj,
        groupId,
      },
      include: {
        pair: true,
      },
    })

    if (schedules.length === 0) {
      return {
        success: false,
        count: 0,
        message: 'Расписание на эту дату не найдено',
      }
    }

    const pairScheduleMap = new Map<string, number>()
    for (const schedule of schedules) {
      const current = pairScheduleMap.get(schedule.pairId) ?? 0
      pairScheduleMap.set(schedule.pairId, current + 1)
    }

    const result = await this.prisma.$transaction(async (tx) => {
      for (const [pairId, count] of pairScheduleMap.entries()) {
        const pair = await tx.pair.findUnique({
          where: { id: pairId },
        })

        if (pair) {
          await tx.pair.update({
            where: { id: pairId },
            data: {
              remaingHours: pair.remaingHours + (count * 2),
            },
          })
        }
      }

      const deleted = await tx.schedule.deleteMany({
        where: {
          id: { in: schedules.map(s => s.id) },
        },
      })

      return deleted
    })

    return {
      success: true,
      count: result.count,
      message: `Удалено ${result.count} пар`,
    }
  }
}