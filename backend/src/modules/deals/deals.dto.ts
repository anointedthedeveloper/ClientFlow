import { IsString, IsNumber, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { DealStage } from '@prisma/client';

export class CreateDealDto {
  @ApiProperty() @IsString() title: string;
  @ApiPropertyOptional() @IsNumber() @IsOptional() value?: number;
  @ApiPropertyOptional() @IsEnum(DealStage) @IsOptional() stage?: DealStage;
  @ApiProperty() @IsString() customerId: string;
  @ApiPropertyOptional() @IsString() @IsOptional() assignedToId?: string;
}

export class UpdateDealDto {
  @ApiPropertyOptional() @IsString() @IsOptional() title?: string;
  @ApiPropertyOptional() @IsNumber() @IsOptional() value?: number;
  @ApiPropertyOptional() @IsEnum(DealStage) @IsOptional() stage?: DealStage;
  @ApiPropertyOptional() @IsString() @IsOptional() assignedToId?: string;
}
