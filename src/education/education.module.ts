import { Module } from '@nestjs/common';
import { EducationService } from './education.service';
import { EducationController } from './education.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Request, RequestSchema } from '../schemas/request.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Request.name, schema: RequestSchema }])
  ],
  providers: [EducationService],
  controllers: [EducationController],
  exports: [EducationService],
})
export class EducationModule {}
