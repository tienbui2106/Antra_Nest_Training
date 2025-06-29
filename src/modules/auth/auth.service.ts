import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { LoginDTO } from 'src/modules/auth/dto/login.dto';
import { CreateUserDto } from 'src/modules/auth/dto/create-user.dto';

@Injectable()
export class AuthService {

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) { }

  async login(user: LoginDTO) {
    const userInfo = await this.userService.validateUser(user);
    const payload = { sub: userInfo._id, email: userInfo.email, role: userInfo.role };
    return {
      access_token: await this.jwtService.signAsync(payload)
    }
  }

  async register(user: CreateUserDto) {
    return await this.userService.createUser(user);
  }

}
