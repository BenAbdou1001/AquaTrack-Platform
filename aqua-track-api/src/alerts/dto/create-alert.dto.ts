import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUrl,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum Severity {
  Info = 'info',
  Warning = 'warning',
  Critical = 'critical',
}

export enum AlertStatus {
  Active = 'active',
  Resolved = 'resolved',
}

export enum AlertType {
  Threshold = 'threshold',
  Anomaly = 'anomaly',
  Maintenance = 'maintenance',
}

export class CreateAlertDto {
  @ApiProperty({
    example: 'pH',
    description:
      'The KPI (Key Performance Indicator) associated with the alert.',
  })
  @IsString()
  @IsNotEmpty()
  kpi: string;

  @ApiProperty({ enum: Severity, description: 'Severity level of the alert.' })
  @IsEnum(Severity)
  severity: Severity;

  @ApiProperty({
    enum: AlertStatus,
    description: 'Status of the alert (active/resolved).',
  })
  @IsEnum(AlertStatus)
  status: AlertStatus;

  @ApiProperty({
    enum: AlertType,
    description: 'Type of the alert (threshold/anomaly/maintenance).',
  })
  @IsEnum(AlertType)
  type: AlertType;

  @ApiProperty({
    example: 'https://example.com/image.png',
    description: 'URL of the image associated with the alert.',
  })
  @IsString()
  @IsNotEmpty()
  @IsUrl({}, { message: 'Image must be a valid URL' })
  image: string;

  @ApiProperty({
    example: 'Ammonia level is too high!',
    description: 'Detailed alert message.',
  })
  @IsString()
  @IsNotEmpty()
  message: string;

  @ApiProperty({
    example: '2025-07-18T08:30:00.000Z',
    description: 'Timestamp when the alert was created (ISO 8601).',
  })
  @IsDateString(
    {},
    { message: 'timestamp must be a valid ISO 8601 date string' },
  )
  timestamp: string;

  @ApiProperty({
    example: '2025-07-18T08:25:00.000Z',
    description: 'Timestamp when the alert was triggered (ISO 8601).',
  })
  @IsDateString(
    {},
    { message: 'triggeredAt must be a valid ISO 8601 date string' },
  )
  triggeredAt: string;

  @ApiProperty({
    example: 'tank-123',
    description: 'Identifier of the tank where the alert occurred.',
  })
  @IsString()
  @IsNotEmpty({ message: 'tankId is required' })
  tankId: string;
}
