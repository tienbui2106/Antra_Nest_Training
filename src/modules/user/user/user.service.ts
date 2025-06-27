import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schema/user.schema';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginDTO } from '../dto/login.dto';
import { hash, compare } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) { }

  async login(user: LoginDTO) {
    const { username, password } = user;
    const userInfoFromDB = await this.userModel.findOne({ username }).exec();
    if (!userInfoFromDB) {
      throw new Error('Username does not exist');
    }
    const match = await compare(password, userInfoFromDB.password);
    if (!match) {
      throw new Error('Invalid password');
    }
    return match
  }

  async register(user: CreateUserDto) {
    const hashedPassword = await hash(user.password, 10);
    user = { ...user, password: hashedPassword };
    console.log(user);
    return this.userModel.create(user);
  }

  getAllUsers() {
    return this.userModel.find().exec();
  }
}
