import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: any): Promise<User> {
    const { username, password, role } = createUserDto;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const createdUser = new this.userModel({ username, password: hashedPassword, role });
    return createdUser.save();
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.userModel.findOne({ username: username }).exec();
  }
}
