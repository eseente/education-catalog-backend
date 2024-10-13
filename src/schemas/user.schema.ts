import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IsEnum } from 'class-validator';

export type UserDocument = User & Document;
export enum UserRole {
    Developer = 'developer',
    Senior = 'senior',
    Manager = 'manager',
}

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, enum: UserRole })
  @IsEnum(UserRole)
  role: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(User);
