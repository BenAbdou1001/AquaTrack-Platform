import { IsString, IsNumber, IsDateString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateForecastingDto {
  @ApiProperty({ example: 'pH', description: 'The KPI being forecasted.' })
  @IsString()
  @IsNotEmpty()
  kpi: string;

  @ApiProperty({
    example: 7.4,
    description: 'The predicted value for the KPI.',
  })
  @IsNumber()
  predictedValue: number;

  @ApiProperty({
    example: '2025-07-20T00:00:00.000Z',
    description: 'The date for which the prediction is made.',
  })
  @IsDateString()
  predictionDate: Date;

  @ApiProperty({
    example: 'tank-001',
    description: 'The ID of the tank associated with the prediction.',
  })
  @IsString()
  @IsNotEmpty()
  tankId: string;
}
