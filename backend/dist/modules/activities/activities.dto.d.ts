import { ActivityType } from '@prisma/client';
export declare class CreateActivityDto {
    type: ActivityType;
    content: string;
    dealId?: string;
}
