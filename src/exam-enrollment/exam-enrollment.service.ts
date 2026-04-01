import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateExamEnrollmentDto } from './dto/create-exam-enrollment.dto';

@Injectable()
export class ExamEnrollmentService {
    constructor(private prisma: PrismaService) { }

    async create(dto: CreateExamEnrollmentDto) {
        return this.prisma.examEnrollment.create({
            data: {
                examId: dto.examId,
                examName: dto.examName,
                fullName: dto.fullName,
                email: dto.email,
                phone: dto.phone,
                level: dto.level,
                registrationData: dto.registrationData || {},
            },
        });
    }

    async findAll() {
        return this.prisma.examEnrollment.findMany({
            orderBy: { createdAt: 'desc' },
        });
    }

    async updateStatus(id: string, status: string) {
        return this.prisma.examEnrollment.update({
            where: { id },
            data: { status },
        });
    }
}
