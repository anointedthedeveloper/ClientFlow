import { DealStage } from '@prisma/client';
export declare class CreateDealDto {
    title: string;
    value?: number;
    stage?: DealStage;
    customerId: string;
    assignedToId?: string;
}
export declare class UpdateDealDto {
    title?: string;
    value?: number;
    stage?: DealStage;
    assignedToId?: string;
}
