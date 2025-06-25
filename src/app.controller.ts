import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('sayHello')
  getHello(@Body() body: any): string {
    console.log(body);

    return this.appService.getHello();
  }
}
