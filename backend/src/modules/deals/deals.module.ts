import { Module } from '@nestjs/common';
import { DealsService } from './deals.service';
import { DealsController } from './deals.controller';

@Module({ providers: [DealsService], controllers: [DealsController] })
export class DealsModule {}
