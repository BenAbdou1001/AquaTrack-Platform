/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  IsString,
  IsEmail,
  IsOptional,
  Length
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @Length(1, 255)
  fullname?: string;

  @IsOptional()
  @IsEmail()
  @Length(1, 255)
  email?: string;
}
