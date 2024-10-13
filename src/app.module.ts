import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserController } from './user/user.controller';
import { EducationController } from './education/education.controller';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { EducationModule } from './education/education.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://esentekkanat:esentekkanat@cluster0.t0ac1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'),
    AuthModule,
    UserModule,
    ConfigModule.forRoot({ isGlobal: true }),
    EducationModule,
  ],
  controllers: [AppController, UserController, EducationController],
  providers: [AppService],
})
export class AppModule {}
