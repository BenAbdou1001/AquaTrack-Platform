import { IsUUID, IsString, IsNotEmpty } from 'class-validator';

export class CreateNotificationDto {
  @IsString()
  @IsNotEmpty({ message: 'Firebase token is required' })
  firebaseToken: string;

  @IsUUID()
  @IsNotEmpty({ message: 'User ID is required' })
  userId: string;

  @IsUUID()
  @IsNotEmpty({ message: 'Alert ID is required' })
  alertId: string;
}
