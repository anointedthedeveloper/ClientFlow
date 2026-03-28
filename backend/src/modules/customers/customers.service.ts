import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCustomerDto, UpdateCustomerDto } from './customers.dto';

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}

  findAll(orgId: string, search?: string) {
    return this.prisma.customer.findMany({
      where: {
        organizationId: orgId,
        ...(search && {
          OR: [
            { name: { contains: search, mode: 'insensitive' } },
            { email: { contains: search, mode: 'insensitive' } },
            { company: { contains: search, mode: 'insensitive' } },
          ],
        }),
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string, orgId: string) {
    const customer = await this.prisma.customer.findFirst({ where: { id, organizationId: orgId } });
    if (!customer) throw new NotFoundException('Customer not found');
    return customer;
  }

  create(dto: CreateCustomerDto, orgId: string) {
    return this.prisma.customer.create({ data: { ...dto, organizationId: orgId } });
  }

  async update(id: string, dto: UpdateCustomerDto, orgId: string) {
    await this.findOne(id, orgId);
    return this.prisma.customer.update({ where: { id }, data: dto });
  }

  async remove(id: string, orgId: string) {
    await this.findOne(id, orgId);
    return this.prisma.customer.delete({ where: { id } });
  }
}
