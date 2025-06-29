import { BadGatewayException, Body, ConflictException, Controller, Get, HttpCode, NotFoundException, Param, Post, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from 'src/modules/auth/dto/login.dto';
import { CreateUserDto } from 'src/modules/auth/dto/create-user.dto';
import { Request, Response } from 'express';
import { UserService } from '../user/user.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) { }

  @Post('login')
  @HttpCode(200)
  async login(@Body() body: LoginDTO, @Res({ passthrough: true }) res: Response) {
    try {
      const { access_token } = await this.authService.login(body);
      res.cookie('access_token', access_token, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000
      })
      return { message: 'Login successful' };
    }
    catch (error) {
      if (error.message === 'Username does not exist') {
        throw new NotFoundException('Username does not exist');
      } else if (error.message === 'Invalid password') {
        throw new UnauthorizedException('Invalid password');
      }
      throw new BadGatewayException('An error occurred during login');
    }
  }

  @Post('register')
  async register(@Body() body: CreateUserDto): Promise<Object> {
    try {
      this.authService.register(body);
      return { message: 'User registered successfully' };
    }
    catch (error) {
      throw new ConflictException('The username and/or email has already been taken');
    }
  }

  @Post('isUserExists/:username')
  async isUserExists(@Param() param: any) {
    const users = await this.userService.getAllUsers();
    const usernames = users.map(user => user.username);
    if (usernames.includes(param.username)) {
      return { exists: true };
    }
    return { exists: false };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }
}
