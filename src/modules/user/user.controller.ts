import { BadGatewayException, Body, ConflictException, Controller, Get, HttpCode, NotFoundException, Patch, Post, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDTO } from './dto/login.dto';
import { UserService } from './user/user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) { }

  @Post('register')
  async registerUser(@Body() body: CreateUserDto): Promise<Object> {
    try {
      await this.userService.register(body);
      return { message: 'User registered successfully' };
    }
    catch (error) {
      throw new ConflictException('The username and/or email has already been taken');
    }
  }

  @Post('login')
  @HttpCode(200)
  async loginUser(@Body() body: LoginDTO) {
    try {
      await this.userService.login(body);
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

  @Get('all')
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }
}
