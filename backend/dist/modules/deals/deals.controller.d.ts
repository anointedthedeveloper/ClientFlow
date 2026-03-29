import { DealsService } from './deals.service';
import { CreateDealDto, UpdateDealDto } from './deals.dto';
export declare class DealsController {
    private service;
    constructor(service: DealsService);
    dashboard(user: any): Promise<{
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
    findAll(user: any): import(".prisma/client").Prisma.PrismaPromise<({
        customer: {
            name: string;
            email: string | null;
            id: string;
            createdAt: Date;
            organizationId: string;
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
        createdAt: Date;
        organizationId: string;
        title: string;
        value: number;
        stage: import(".prisma/client").$Enums.DealStage;
        customerId: string;
        assignedToId: string | null;
    })[]>;
    findOne(id: string, user: any): Promise<{
        customer: {
            name: string;
            email: string | null;
            id: string;
            createdAt: Date;
            organizationId: string;
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
            type: import(".prisma/client").$Enums.ActivityType;
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
        createdAt: Date;
        organizationId: string;
        title: string;
        value: number;
        stage: import(".prisma/client").$Enums.DealStage;
        customerId: string;
        assignedToId: string | null;
    }>;
    create(dto: CreateDealDto, user: any): import(".prisma/client").Prisma.Prisma__DealClient<{
        customer: {
            name: string;
            email: string | null;
            id: string;
            createdAt: Date;
            organizationId: string;
            phone: string | null;
            company: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        organizationId: string;
        title: string;
        value: number;
        stage: import(".prisma/client").$Enums.DealStage;
        customerId: string;
        assignedToId: string | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, dto: UpdateDealDto, user: any): Promise<{
        customer: {
            name: string;
            email: string | null;
            id: string;
            createdAt: Date;
            organizationId: string;
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
        createdAt: Date;
        organizationId: string;
        title: string;
        value: number;
        stage: import(".prisma/client").$Enums.DealStage;
        customerId: string;
        assignedToId: string | null;
    }>;
    remove(id: string, user: any): Promise<{
        id: string;
        createdAt: Date;
        organizationId: string;
        title: string;
        value: number;
        stage: import(".prisma/client").$Enums.DealStage;
        customerId: string;
        assignedToId: string | null;
    }>;
}
