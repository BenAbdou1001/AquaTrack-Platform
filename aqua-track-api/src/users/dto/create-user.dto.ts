import { IsString, IsEmail, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum Gender {
  Male = 'male',
  Female = 'female',
}

export class CreateUserDto {
  @ApiProperty({ example: 'John Doe', description: 'Full name of the user' })
  @IsString()
  @Length(1, 255)
  fullName: string;

  @ApiProperty({ example: 'johndoe@example.com', description: 'Email address of the user' })
  @IsEmail()
  @Length(1, 255)
  email: string;

  @ApiProperty({ example: 'securePassword123', description: 'Password of the user (min 6 characters)' })
  @IsString()
  @Length(6, 255)
  password: string;

  @ApiProperty({ example: '0555123456', description: 'Phone number of the user (10-15 digits)' })
  @IsString()
  @Length(10, 15)
  phoneNumber: string;

  @ApiProperty({ example: 'securePassword123', description: 'Password confirmation (must match password)' })
  @IsString()
  @Length(6, 255)
  confirmPassword: string;
}
