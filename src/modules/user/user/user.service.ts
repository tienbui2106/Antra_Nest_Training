import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schema/user.schema';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginDTO } from '../dto/login.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) { }

  login(user: LoginDTO) {
    return this.userModel.findOne({ username: user.username, password: user.password }).exec();
  }

  register(user: CreateUserDto) {
    return this.userModel.create(user);
  }

  getAllUsers() {
    return this.userModel.find().exec();
  }
}
