import { PartialType } from '@nestjs/mapped-types';
import { CreateTankDto } from './create-tank.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateTankDto extends PartialType(CreateTankDto) {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    location?: string;
}
