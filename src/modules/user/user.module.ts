import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../../schemas/user.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/passports/jwt.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema
      }
    ]),
    PassportModule
  ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
  exports: [UserService, MongooseModule],
})
export class UserModule { }
