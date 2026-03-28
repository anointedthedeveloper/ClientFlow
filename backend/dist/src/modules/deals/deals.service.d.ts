import { PrismaService } from '../../prisma/prisma.service';
import { CreateDealDto, UpdateDealDto } from './deals.dto';
export declare class DealsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(orgId: string): import("@prisma/client").Prisma.PrismaPromise<({
        customer: {
            name: string;
            email: string | null;
            id: string;
            organizationId: string;
            createdAt: Date;
            phone: string | null;
            company: string | null;
        };
        assignedTo: {
            name: string;
            email: string;
            id: string;
        } | null;
    } & {
        id: string;
        organizationId: string;
        createdAt: Date;
        title: string;
        value: number;
        stage: import("@prisma/client").$Enums.DealStage;
        customerId: string;
        assignedToId: string | null;
    })[]>;
    findOne(id: string, orgId: string): Promise<{
        customer: {
            name: string;
            email: string | null;
            id: string;
            organizationId: string;
            createdAt: Date;
            phone: string | null;
            company: string | null;
        };
        activities: ({
            user: {
                name: string;
                id: string;
            };
        } & {
            id: string;
            createdAt: Date;
            type: import("@prisma/client").$Enums.ActivityType;
            content: string;
            dealId: string | null;
            createdBy: string;
        })[];
        assignedTo: {
            name: string;
            email: string;
            id: string;
        } | null;
    } & {
        id: string;
        organizationId: string;
        createdAt: Date;
        title: string;
        value: number;
        stage: import("@prisma/client").$Enums.DealStage;
        customerId: string;
        assignedToId: string | null;
    }>;
    create(dto: CreateDealDto, orgId: string): import("@prisma/client").Prisma.Prisma__DealClient<{
        customer: {
            name: string;
            email: string | null;
            id: string;
            organizationId: string;
            createdAt: Date;
            phone: string | null;
            company: string | null;
        };
    } & {
        id: string;
        organizationId: string;
        createdAt: Date;
        title: string;
        value: number;
        stage: import("@prisma/client").$Enums.DealStage;
        customerId: string;
        assignedToId: string | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, dto: UpdateDealDto, orgId: string): Promise<{
        customer: {
            name: string;
            email: string | null;
            id: string;
            organizationId: string;
            createdAt: Date;
            phone: string | null;
            company: string | null;
        };
        assignedTo: {
            name: string;
            email: string;
            id: string;
        } | null;
    } & {
        id: string;
        organizationId: string;
        createdAt: Date;
        title: string;
        value: number;
        stage: import("@prisma/client").$Enums.DealStage;
        customerId: string;
        assignedToId: string | null;
    }>;
    remove(id: string, orgId: string): Promise<{
        id: string;
        organizationId: string;
        createdAt: Date;
        title: string;
        value: number;
        stage: import("@prisma/client").$Enums.DealStage;
        customerId: string;
        assignedToId: string | null;
    }>;
    getDashboard(orgId: string): Promise<{
        totalCustomers: number;
        totalDeals: number;
        totalRevenue: number;
        byStage: {
            LEAD: number;
            CONTACTED: number;
            PROPOSAL: number;
            CLOSED: number;
        };
    }>;
}
