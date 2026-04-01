import { Module } from '@nestjs/common';
import { ExamEnrollmentController } from './exam-enrollment.controller';
import { ExamEnrollmentService } from './exam-enrollment.service';

@Module({
    controllers: [ExamEnrollmentController],
    providers: [ExamEnrollmentService],
    exports: [ExamEnrollmentService],
})
export class ExamEnrollmentModule { }
