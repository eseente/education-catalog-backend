import { Controller, Post, Body, Get, Param, Patch, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { EducationService } from './education.service';

@Controller('education')
export class EducationController {
  constructor(private readonly educationService: EducationService) {}

  @UseGuards(JwtAuthGuard)
  @Post('submit')
  async submitRequest(@Request() req, @Body() requestData: any) {
    return this.educationService.submitRequest(req.user, requestData);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user-requests')
  async getUserRequests(@Request() req) {
    return this.educationService.getUserRequests(req.user.username);
  }

  @UseGuards(JwtAuthGuard)
  @Get('senior-requests')
  async getPendingRequestsForSenior() {
    return this.educationService.getPendingRequestsForSenior();
  }

  @UseGuards(JwtAuthGuard)
  @Get('manager-requests')
  async getRequestsForManager() {
    return this.educationService.getRequestsForManager();
  }

  @UseGuards(JwtAuthGuard)
  @Patch('senior-approve/:id')
  async approveBySenior(@Param('id') id: string) {
    return this.educationService.approveBySenior(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('manager-approve/:id')
  async approveByManager(@Param('id') id: string) {
    return this.educationService.approveByManager(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('reject/:id')
  async rejectRequest(@Param('id') id: string) {
    return this.educationService.rejectRequest(id);
  }
}
