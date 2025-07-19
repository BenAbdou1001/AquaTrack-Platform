import { IsString, IsNumber, IsOptional, IsDate } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSensorDataDto {
  @ApiProperty({
    example: 'Tank A1',
    description: 'The name of the tank the sensor is attached to.',
  })
  @IsString()
  tankName: string;

  @ApiProperty({
    example: 'Ammonia',
    description: 'The KPI (Key Performance Indicator) being measured.',
  })
  @IsString()
  kpi: string;

  @ApiProperty({
    example: 3.7,
    description: 'The measured value of the KPI.',
  })
  @IsNumber()
  value: number;

  @ApiPropertyOptional({
    example: '2025-07-19T12:00:00.000Z',
    description: 'Optional timestamp when the data was recorded. If omitted, server will use current time.',
  })
  @IsOptional()
  @IsDate()
  timestamp?: Date;
}
