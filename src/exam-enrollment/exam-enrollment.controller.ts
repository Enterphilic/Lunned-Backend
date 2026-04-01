import { Controller, Post, Body, Get, Patch, Param } from '@nestjs/common';
import { ExamEnrollmentService } from './exam-enrollment.service';
import { CreateExamEnrollmentDto } from './dto/create-exam-enrollment.dto';

@Controller('exam-enroll')
export class ExamEnrollmentController {
    constructor(private readonly examEnrollmentService: ExamEnrollmentService) { }

    @Post()
    create(@Body() dto: CreateExamEnrollmentDto) {
        return this.examEnrollmentService.create(dto);
    }

    @Get()
    findAll() {
        return this.examEnrollmentService.findAll();
    }

    @Get('user/:userId')
    findAllByUserId(@Param('userId') userId: string) {
        return this.examEnrollmentService.findAllByUserId(userId);
    }

    @Patch(':id/status')
    updateStatus(@Param('id') id: string, @Body('status') status: string) {
        return this.examEnrollmentService.updateStatus(id, status);
    }
}
