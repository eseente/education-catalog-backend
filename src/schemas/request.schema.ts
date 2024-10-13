import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RequestDocument = Request & Document;

@Schema()
export class Request {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  role: string;

  @Prop({ required: true })
  firstChoice: string;

  @Prop({ required: true })
  secondChoice: string;

  @Prop({ required: true })
  explanation: string;

  @Prop({ default: 'Pending' })
  status: string;
}

export const RequestSchema = SchemaFactory.createForClass(Request);
