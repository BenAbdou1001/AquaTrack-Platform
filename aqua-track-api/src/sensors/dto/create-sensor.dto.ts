import { IsString, IsUUID, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSensorDto {
  @ApiProperty({
    example: 'temperature',
    description: 'Type of the sensor (e.g., temperature, pH, salinity, etc.)',
  })
  @IsString()
  @IsNotEmpty({ message: 'Sensor type is required' })
  type: string;

  @ApiProperty({
    example: 'Temperature',
    description: 'KPI that this sensor is responsible for tracking.',
  })
  @IsString()
  @IsNotEmpty({ message: 'KPI is required' })
  kpi: string;

  @ApiProperty({
    example: 'a3b25f14-bd15-4cde-81d7-5893f2c4c921',
    description: 'UUID of the tank to which this sensor is attached.',
  })
  @IsUUID()
  @IsNotEmpty({ message: 'Tank ID is required' })
  tankId: string;
}
