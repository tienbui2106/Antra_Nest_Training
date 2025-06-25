import {
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';

@Controller('login')
export class LoginController {
  constructor() {}

  @Get('isUsernameExist/:username')
  @HttpCode(200)
  isUsernameExist(@Param() param: any): boolean {
    const username = param.username;

    if (username === 'martin') return true;
    else return false;
  }

  @Post('isAuthenticated')
  @HttpCode(200)
  isAuthenticated(@Req() request: any, @Res() res: any): string | never {
    // console.log(body);
    console.log(request.body);
    // if (body.username === 'Martin') {
    if (request.body.username === 'Martin') {
      return "User is authenticated";
    } else {
      console.log(res);
      // throw new HttpException("User is not authenticated", 401);
      throw new UnauthorizedException("User is not authenticated");
    }
  }

}
