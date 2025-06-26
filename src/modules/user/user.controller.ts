import { Body, ConflictException, Controller, Get, HttpCode, Post, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDTO } from './dto/login.dto';
import { UserService } from './user/user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) { }

  @Post('register')
  async registerUser(@Body() body: CreateUserDto): Promise<Object> {
    console.log(body);
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
  async loginUser(@Body() body: LoginDTO): Promise<Object> {
    const user = await this.userService.login(body);
    if (user) {
      return { message: 'Login successful' };
    } else {
      throw new UnauthorizedException('Invalid username or password');
    }
  }

  @Get('all')
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }
}
