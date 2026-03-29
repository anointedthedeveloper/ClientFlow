import { PrismaService } from '../../prisma/prisma.service';
import { CreateCustomerDto, UpdateCustomerDto } from './customers.dto';
export declare class CustomersService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(orgId: string, search?: string): import(".prisma/client").Prisma.PrismaPromise<{
        name: string;
        email: string | null;
        id: string;
        createdAt: Date;
        organizationId: string;
        phone: string | null;
        company: string | null;
    }[]>;
    findOne(id: string, orgId: string): Promise<{
        name: string;
        email: string | null;
        id: string;
        createdAt: Date;
        organizationId: string;
        phone: string | null;
        company: string | null;
    }>;
    create(dto: CreateCustomerDto, orgId: string): import(".prisma/client").Prisma.Prisma__CustomerClient<{
        name: string;
        email: string | null;
        id: string;
        createdAt: Date;
        organizationId: string;
        phone: string | null;
        company: string | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, dto: UpdateCustomerDto, orgId: string): Promise<{
        name: string;
        email: string | null;
        id: string;
        createdAt: Date;
        organizationId: string;
        phone: string | null;
        company: string | null;
    }>;
    remove(id: string, orgId: string): Promise<{
        name: string;
        email: string | null;
        id: string;
        createdAt: Date;
        organizationId: string;
        phone: string | null;
        company: string | null;
    }>;
}
