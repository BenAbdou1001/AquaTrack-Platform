import { Body, Controller, Get, Headers, HttpCode, HttpStatus, Post, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { CreateAuthDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() authDto:CreateAuthDto) {
        return this.authService.signIn(authDto);
    }

    @HttpCode(HttpStatus.OK)
    @Post('signup')
    signUp(@Body() signUpDto: CreateUserDto) {
        return this.authService.signup(signUpDto);
    }

    @Post('verify/email')
    verifyEmail(@Body() info: any) {
        return this.authService.verifyEmail(info.email)
    }



}
