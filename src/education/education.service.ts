import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Request, RequestDocument } from '../schemas/request.schema';

@Injectable()
export class EducationService {
  constructor(@InjectModel(Request.name) private requestModel: Model<RequestDocument>) {}

  async submitRequest(user: any, requestData: any): Promise<Request> {
    const newRequest = new this.requestModel({
      username: user.username,
      role: user.role,
      firstChoice: requestData.firstChoice,
      secondChoice: requestData.secondChoice,
      explanation: requestData.explanation,
      status: 'Pending',
    });

    return newRequest.save();
  }

  async getAllRequests(): Promise<Request[]> {
    return this.requestModel.find().exec();
  }

  async getUserRequests(username: string): Promise<Request[]> {
    return this.requestModel.find({ username }).exec();
  }

  async getPendingRequestsForSenior(): Promise<Request[]> {
    return this.requestModel.find({ status: 'Pending' }).exec();
  }

  async getRequestsForManager(): Promise<Request[]> {
    return this.requestModel.find({ status: 'Senior Approved' }).exec();
  }

  async approveBySenior(requestId: string): Promise<Request | null> {
    const request = await this.requestModel.findById(requestId).exec();
    if (request && request.status === 'Pending') {
      request.status = 'Senior Approved';
      return request.save();
    }
    return null;
  }

  async approveByManager(requestId: string): Promise<Request | null> {
    const request = await this.requestModel.findById(requestId).exec();
    if (request && request.status === 'Senior Approved') {
      request.status = 'Approved';
      return request.save();
    }
    return null;
  }

  async rejectRequest(requestId: string): Promise<Request | null> {
    const request = await this.requestModel.findById(requestId).exec();
    if (request) {
      request.status = 'Rejected';
      return request.save();
    }
    return null;
  }
}
