import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateDealDto, UpdateDealDto } from './deals.dto';

@Injectable()
export class DealsService {
  constructor(private prisma: PrismaService) {}

  findAll(orgId: string) {
    return this.prisma.deal.findMany({
      where: { organizationId: orgId },
      include: { customer: true, assignedTo: { select: { id: true, name: true, email: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string, orgId: string) {
    const deal = await this.prisma.deal.findFirst({
      where: { id, organizationId: orgId },
      include: {
        customer: true,
        assignedTo: { select: { id: true, name: true, email: true } },
        activities: { include: { user: { select: { id: true, name: true } } }, orderBy: { createdAt: 'desc' } },
      },
    });
    if (!deal) throw new NotFoundException('Deal not found');
    return deal;
  }

  create(dto: CreateDealDto, orgId: string) {
    return this.prisma.deal.create({
      data: { ...dto, organizationId: orgId },
      include: { customer: true },
    });
  }

  async update(id: string, dto: UpdateDealDto, orgId: string) {
    await this.findOne(id, orgId);
    return this.prisma.deal.update({
      where: { id },
      data: dto,
      include: { customer: true, assignedTo: { select: { id: true, name: true, email: true } } },
    });
  }

  async remove(id: string, orgId: string) {
    await this.findOne(id, orgId);
    return this.prisma.deal.delete({ where: { id } });
  }

  async getDashboard(orgId: string) {
    const [totalCustomers, deals] = await Promise.all([
      this.prisma.customer.count({ where: { organizationId: orgId } }),
      this.prisma.deal.findMany({ where: { organizationId: orgId } }),
    ]);

    const totalDeals = deals.length;
    const totalRevenue = deals.filter(d => d.stage === 'CLOSED').reduce((sum, d) => sum + d.value, 0);
    const byStage = { LEAD: 0, CONTACTED: 0, PROPOSAL: 0, CLOSED: 0 };
    deals.forEach(d => byStage[d.stage]++);

    return { totalCustomers, totalDeals, totalRevenue, byStage };
  }
}
