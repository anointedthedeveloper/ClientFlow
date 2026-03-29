import { CustomersService } from './customers.service';
import { CreateCustomerDto, UpdateCustomerDto } from './customers.dto';
export declare class CustomersController {
    private service;
    constructor(service: CustomersService);
    findAll(user: any, search?: string): import(".prisma/client").Prisma.PrismaPromise<{
        name: string;
        email: string | null;
        id: string;
        createdAt: Date;
        organizationId: string;
        phone: string | null;
        company: string | null;
    }[]>;
    findOne(id: string, user: any): Promise<{
        name: string;
        email: string | null;
        id: string;
        createdAt: Date;
        organizationId: string;
        phone: string | null;
        company: string | null;
    }>;
    create(dto: CreateCustomerDto, user: any): import(".prisma/client").Prisma.Prisma__CustomerClient<{
        name: string;
        email: string | null;
        id: string;
        createdAt: Date;
        organizationId: string;
        phone: string | null;
        company: string | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, dto: UpdateCustomerDto, user: any): Promise<{
        name: string;
        email: string | null;
        id: string;
        createdAt: Date;
        organizationId: string;
        phone: string | null;
        company: string | null;
    }>;
    remove(id: string, user: any): Promise<{
        name: string;
        email: string | null;
        id: string;
        createdAt: Date;
        organizationId: string;
        phone: string | null;
        company: string | null;
    }>;
}
