import { Controller, Post, Get, Body, Param, Patch, UseGuards } from '@nestjs/common';
import { MentorshipService } from './mentorship.service';
import { CreateMentorRequestDto } from './dto/create-mentor-request.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('mentorship')
@Controller('mentorship')
export class MentorshipController {
    constructor(private readonly mentorshipService: MentorshipService) { }

    @Post('request')
    @ApiOperation({ summary: 'Submit a mentorship request (find or become)' })
    @ApiResponse({ status: 201, description: 'Request successfully submitted.' })
    async create(@Body() dto: CreateMentorRequestDto) {
        return this.mentorshipService.createRequest(dto);
    }

    @Get('requests')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('ADMIN')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get all mentorship requests (Admin only)' })
    async findAll() {
        return this.mentorshipService.findAllRequests();
    }

    @Patch('requests/:id/status')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('ADMIN')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update mentorship request status (Admin only)' })
    async updateStatus(@Param('id') id: string, @Body('status') status: string) {
        return this.mentorshipService.updateRequestStatus(id, status);
    }

    @Post('requests/:id/assign')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('ADMIN')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Assign a mentor to a request (Admin only)' })
    async assign(@Param('id') id: string, @Body('mentor_id') mentor_id: string) {
        return this.mentorshipService.assignMentor(id, mentor_id);
    }
}
