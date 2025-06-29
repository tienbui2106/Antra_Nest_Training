import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../../schemas/user.schema';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import { LoginDTO } from '../auth/dto/login.dto';
import { hash, compare } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) { }

  getUserById(id: string) {
    return this.userModel.findById(id).exec();
  }

  getAllUsers() {
    return this.userModel.find().exec();
  }

  async createUser(user: CreateUserDto) {
    const hashedPassword = await hash(user.password, 10);
    user = { ...user, password: hashedPassword };
    return this.userModel.create(user);
  }

  async validateUser(user: LoginDTO) {
    const foundUser = await this.userModel.findOne({ username: user.username }).exec();
    if (!foundUser) {
      throw new Error('Username does not exist');
    }
    const isPasswordValid = await compare(user.password, foundUser.password);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }
    return foundUser;
  }
}
