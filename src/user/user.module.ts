import { Module } from '@nestjs/common';
import { LoginController } from './login/login.controller';

@Module({
  imports: [],
  controllers: [LoginController],
  providers: [],
  exports: [],
})
export class UserModule {}
