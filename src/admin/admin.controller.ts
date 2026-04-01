import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('admin')
@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class AdminController {
  constructor(private readonly adminService: AdminService) { }

  @Get('stats')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Get platform-wide statistics' })
  getStats() {
    return this.adminService.getPlatformStats();
  }

  @Get('verifications/pending')
  @Roles('ADMIN', 'STAFF_ONBOARDING')
  @ApiOperation({ summary: 'Get pending professional verifications' })
  getPendingVerifications() {
    return this.adminService.getPendingVerifications();
  }

  @Post('verifications/:id/approve')
  @Roles('ADMIN', 'STAFF_ONBOARDING')
  @ApiOperation({ summary: 'Approve a professional profile' })
  approve(@Param('id') id: string, @Body('role') role: 'TUTOR' | 'MENTOR') {
    return this.adminService.approveProfessional(id, role);
  }

  @Post('verifications/:id/reject')
  @Roles('ADMIN', 'STAFF_ONBOARDING')
  @ApiOperation({ summary: 'Reject a professional profile' })
  reject(
    @Param('id') id: string,
    @Body('role') role: 'TUTOR' | 'MENTOR',
    @Body('reason') reason: string,
  ) {
    return this.adminService.rejectProfessional(id, role, reason);
  }

  @Get('users')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Get all users with pagination' })
  getAllUsers(@Query('page') page?: string, @Query('limit') limit?: string) {
    return this.adminService.getAllUsers(
      page ? parseInt(page) : 1,
      limit ? parseInt(limit) : 10,
    );
  }

  @Get('matching/requests')
  @Roles('ADMIN', 'STAFF_MATCHING')
  @ApiOperation({ summary: 'Get unassigned student requests' })
  getUnassignedRequests() {
    return this.adminService.getUnassignedRequests();
  }

  @Get('matching/requests/count')
  @Roles('ADMIN', 'STAFF_MATCHING')
  @ApiOperation({ summary: 'Get count of unassigned student requests' })
  getUnassignedCount() {
    return this.adminService.getUnassignedCount();
  }

  @Get('mentorship-requests')
  @Roles('ADMIN', 'STAFF_MATCHING')
  @ApiOperation({ summary: 'Get all pending mentorship requests (leads)' })
  getMentorshipRequests() {
    return this.adminService.getPendingMentorRequests();
  }

  @Get('matching/eligible')
  @Roles('ADMIN', 'STAFF_MATCHING')
  @ApiOperation({ summary: 'Get professionals eligible for matching' })
  getEligibleProfessionals(
    @Query('subjects') subjects: string,
    @Query('role') role: 'TUTOR' | 'MENTOR',
  ) {
    const subjectList = subjects ? subjects.split(',') : [];
    return this.adminService.getEligibleProfessionals(subjectList, role);
  }

  @Post('matching/:id/assign')
  @Roles('ADMIN', 'STAFF_MATCHING')
  @ApiOperation({ summary: 'Manually assign a professional to a request' })
  assign(
    @Param('id') id: string,
    @Body('professionalId') professionalId: string,
    @Body('role') role: 'TUTOR' | 'MENTOR',
  ) {
    return this.adminService.assignProfessional(id, professionalId, role);
  }

  @Post('users/:id/role')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Update a user role' })
  updateRole(@Param('id') id: string, @Body('role') role: string) {
    return this.adminService.updateUserRole(id, role);
  }

  @Post('users')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Create a new user/staff directly' })
  create(@Body() data: any) {
    return this.adminService.createUser(data);
  }

  @Get('bookings/payouts/pending')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Get all completed bookings pending payout approval' })
  getPendingPayouts() {
    return this.adminService.getPendingPayouts();
  }

  @Post('bookings/:id/approve')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Approve a completed booking for payment' })
  approveBooking(@Param('id') id: string) {
    return this.adminService.approveBooking(id);
  }
}
