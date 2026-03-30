import { Controller, Post, Get, Body, Param, Patch, UseGuards } from '@nestjs/common';
import { AssignmentsService } from './assignments.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { AssignmentStatus } from '@prisma/client';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('assignments')
@Controller('assignments')
@ApiBearerAuth()
export class AssignmentsController {
    constructor(private readonly assignmentsService: AssignmentsService) { }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Create a new assignment' })
    async create(@Body() dto: CreateAssignmentDto) {
        return this.assignmentsService.create(dto);
    }

    @Get('student/:id')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Get assignments for a student' })
    async findByStudent(@Param('id') id: string) {
        return this.assignmentsService.findByStudent(id);
    }

    @Get('tutor/:id')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Get assignments for a tutor' })
    async findByTutor(@Param('id') id: string) {
        return this.assignmentsService.findByTutor(id);
    }

    @Get('mentor/:id')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Get assignments for a mentor' })
    async findByMentor(@Param('id') id: string) {
        return this.assignmentsService.findByMentor(id);
    }

    @Patch(':id/status')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Update assignment status' })
    async updateStatus(
        @Param('id') id: string,
        @Body('status') status: AssignmentStatus,
    ) {
        return this.assignmentsService.updateStatus(id, status);
    }
}
