import { Body, ConflictException, Controller, HttpCode, Post, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDTO } from './dto/login.dto';

@Controller('user')
export class UserController {

  @Post('register')
  registerUser(@Body() body: CreateUserDto): string {
    if (body.username !== 'tbui171483') {
      return 'User registered successfully';
    } else {
      throw new ConflictException('Username already exists');
    }
  }

  @Post('login')
  @HttpCode(200)
  loginUser(@Body() body: LoginDTO): string {
    if (body.username === 'tbui171483' && body.password === '123456789') {
      return 'User logged in successfully';
    }
    else {
      throw new UnauthorizedException('Invalid username or password');
    }
  }

}
