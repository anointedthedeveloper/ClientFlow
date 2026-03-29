import { PrismaService } from '../../prisma/prisma.service';
import { CreateActivityDto } from './activities.dto';
export declare class ActivitiesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateActivityDto, userId: string): import(".prisma/client").Prisma.Prisma__ActivityClient<{
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
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    findByDeal(dealId: string): import(".prisma/client").Prisma.PrismaPromise<({
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
    })[]>;
}
