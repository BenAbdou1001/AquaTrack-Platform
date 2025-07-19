import { IsUUID, IsString, IsNotEmpty, IsDateString, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReviewDto {
  @ApiProperty({
    example: ['pH', 'Temperature'],
    description: 'List of KPIs included in the review.',
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ message: 'KPI is required' })
  kpi: string[];

  @ApiProperty({
    example: '2025-07-19T10:00:00.000Z',
    description: 'Date and time when the review was generated (ISO 8601 format).',
  })
  @IsDateString({}, {
    message: 'generatedAt must be a valid ISO 8601 date string',
  })
  generatedAt: string;

  @ApiProperty({
    example: 'The water quality was consistent with acceptable ranges during the shift.',
    description: 'Textual content of the review.',
  })
  @IsString()
  @IsNotEmpty({ message: 'Content is required' })
  content: string;

  @ApiProperty({
    example: 'a3b25f14-bd15-4cde-81d7-5893f2c4c921',
    description: 'UUID of the tank the review is associated with.',
  })
  @IsUUID()
  @IsNotEmpty({ message: 'Tank ID is required' })
  tankId: string;
}
