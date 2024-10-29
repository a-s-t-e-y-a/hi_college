import {
  Controller,
  Post,
  Body,
  Res,
  HttpException,
  HttpStatus,
  Get,
  UseGuards,
  Req,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiCookieAuth,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { AuthDto, AuthResponse } from './dto/create-auth.dto';
import { AuthGuard } from './auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({
    status: 201,
    description: 'User successfully registered',
    type: AuthResponse,
  })
  @ApiBadRequestResponse({
    description: 'User already exists or invalid input',
  })
  async signup(
    @Body() authDto: AuthDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const { token } = await this.authService.signup(
        authDto.email,
        authDto.password,
      );
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60 * 1000,
      });
      return { message: 'User registered successfully' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({
    status: 200,
    description: 'User successfully logged in',
    type: AuthResponse,
  })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  async login(
    @Body() authDto: AuthDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const { token } = await this.authService.login(
        authDto.email,
        authDto.password,
      );
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60 * 1000,
      });
      return { message: 'Logged in successfully' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }

  @Post('logout')
  @ApiOperation({ summary: 'Logout user' })
  @ApiResponse({
    status: 200,
    description: 'User successfully logged out',
  })
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('token');
    return { message: 'Logged out successfully' };
  }

  @Get('me')
  @UseGuards(AuthGuard)
  @ApiCookieAuth()
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({
    status: 200,
    description: 'Returns the current user profile',
  })
  @ApiUnauthorizedResponse({ description: 'Not authenticated' })
  getProfile(@Req() req) {
    return { user: req.user };
  }
}
