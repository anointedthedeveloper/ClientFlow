import { Role } from '@prisma/client';
export declare const CurrentUser: (...dataOrPipes: unknown[]) => ParameterDecorator;
export declare const Roles: (...roles: Role[]) => import("@nestjs/common").CustomDecorator<string>;
