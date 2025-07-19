/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateAuthDto {
  @IsEmail()
  @Length(1, 255)
  email: string;

  @IsString()
  @Length(1, 255)
  pass: string;
}
