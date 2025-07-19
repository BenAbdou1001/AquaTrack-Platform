import { IsOptional, IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTankDto {
  @ApiProperty({
    description: 'Name of the tank',
    example: 'Tank A',
  })
  @IsString()
  @IsNotEmpty({ message: 'Tank name is required' })
  name: string;

  @ApiPropertyOptional({
    description: 'Location of the tank',
    example: 'Zone 3 - North Plant',
  })
  @IsOptional()
  @IsString({ message: 'Location must be a string' })
  location?: string;
}
