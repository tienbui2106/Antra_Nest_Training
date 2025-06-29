import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/role/roles.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) { }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('all')
  @Roles(['admin'])
  async getAllUsers(@Req() req) {
    return await this.userService.getAllUsers();
  }
}
