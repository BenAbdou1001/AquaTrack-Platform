import { IsString, IsNotEmpty, IsUUID, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateSuggestionDto {
  @ApiProperty({
    description: 'The KPI that the suggestion is related to.',
  })
  @IsString()
  @IsNotEmpty({ message: 'KPI is required' })
  kpi: string;

  @ApiProperty({
    description: 'The content of the suggestion.',
  })
  @IsString()
  @IsNotEmpty({ message: 'Message is required' })
  message: string;

  @ApiProperty({
    description: 'The date when the suggestion was created.',
  })
  @IsDateString()
  createdAt: Date;

  @ApiProperty({
    description: 'The ID of the tank that the suggestion is related to.',
  })
  @IsUUID()
  tankId: string;
}
