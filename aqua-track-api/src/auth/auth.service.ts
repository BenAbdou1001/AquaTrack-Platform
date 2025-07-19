/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import * as nodemailer from 'nodemailer';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { CreateAuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private userServices: UsersService,
    private jwtService: JwtService,
  ) {}

  private verificationCodes = new Map<string, string>();

  async signIn(authDto: CreateAuthDto) {
    const { email, pass } = authDto;

    if (!email || !pass) {
      throw new BadRequestException('Email and password are required.');
    }

    const user = await this.userServices.findByEmail(email);
    if (!user) {
      throw new BadRequestException('Incorrect Credentials');
    }

    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Incorrect Credentials');
    }

    const { password, ...userInfo } = user;
    const payload = { sub: userInfo.id };
    return { user: userInfo, token: await this.jwtService.signAsync(payload) };
  }

  async signup(signUpDto: CreateUserDto) {
    const { email, password, confirmPassword } = signUpDto;

    if (!this.verificationCodes.has(email)) {
      throw new BadRequestException('Email not verified');
    }

    if (password !== confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }

    this.verificationCodes.delete(email);

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await this.userServices.create({
      ...signUpDto,
      password: hashedPassword,
    });

    const payload = { sub: newUser.id };
    const token = await this.jwtService.signAsync(payload);

    const { password: _, ...userWithoutPassword } = newUser;

    return { user: userWithoutPassword, token };
  }

  async verifyEmail(email: string) {
    // const user = await this.userServices.findByEmail(email);
    // if (user) {
    //   throw new BadRequestException('A user with this email already exists.');
    // }

    const verificationCode = Math.floor(
      100000 + Math.random() * 900000,
    ).toString();
    this.verificationCodes.set(email, verificationCode);

    await this.sendVerificationEmail(email, verificationCode);

    return { message: 'Verification email sent successfully.' };
  }

  async sendVerificationEmail(email: string, code: string) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your Verification Code',
      text: `Your verification code is: ${code}`,
    };

    try {
      await transporter.sendMail(mailOptions);
    } catch (err) {
      console.error('Email sending failed:', err);
      throw new BadRequestException(
        'Failed to send verification email. Try again.',
      );
    }
  }

  async verifyCode(email: string, code: string) {
    const storedCode = this.verificationCodes.get(email);
    if (!storedCode) {
      throw new BadRequestException('No verification code found or expired.');
    }

    if (storedCode !== code) {
      throw new BadRequestException('Invalid verification code.');
    }

    this.verificationCodes.delete(email);
    return { message: 'Verification successful.' };
  }

  // async verifyToken(authHeader: string) {
  //     console.log('Received auth header:', authHeader);

  //     if (!authHeader || !authHeader.startsWith('Bearer ')) {
  //         throw new UnauthorizedException('Invalid authorization header');
  //     }

  //     const token = authHeader.split(' ')[1]; // Extract the token from the header
  //     console.log('Extracted token:', token);

  //     try {
  //         const payload = await this.jwtService.verifyAsync(token, {
  //             secret: this.configService.get('JWT_SECRET'),
  //         });
  //         console.log('Token payload:', payload);
  //         return payload;
  //     } catch (error) {
  //         console.error('Token verification failed:', error);
  //         throw new UnauthorizedException('Invalid or expired token');
  //     }
  // }
}
