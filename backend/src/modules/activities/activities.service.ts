import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateActivityDto } from './activities.dto';

@Injectable()
export class ActivitiesService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateActivityDto, userId: string) {
    return this.prisma.activity.create({
      data: { ...dto, createdBy: userId },
      include: { user: { select: { id: true, name: true } } },
    });
  }

  findByDeal(dealId: string) {
    return this.prisma.activity.findMany({
      where: { dealId },
      include: { user: { select: { id: true, name: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }
}
