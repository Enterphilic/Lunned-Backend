import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { AssignmentStatus } from '@prisma/client';

@Injectable()
export class AssignmentsService {
    constructor(private prisma: PrismaService) { }

    async create(dto: CreateAssignmentDto) {
        return this.prisma.assignment.create({
            data: {
                title: dto.title,
                description: dto.description,
                student_id: dto.student_id,
                tutor_id: dto.tutor_id,
                mentor_id: dto.mentor_id,
                dueDate: dto.dueDate ? new Date(dto.dueDate) : null,
                file_url: dto.file_url,
            },
        });
    }

    async findByStudent(studentId: string) {
        return this.prisma.assignment.findMany({
            where: { student_id: studentId },
            include: {
                tutor: { include: { user: true } },
                mentor: { include: { user: true } },
            },
            orderBy: { createdAt: 'desc' },
        });
    }

    async findByTutor(tutorId: string) {
        return this.prisma.assignment.findMany({
            where: { tutor_id: tutorId },
            include: {
                student: { include: { user: true } },
            },
            orderBy: { createdAt: 'desc' },
        });
    }

    async findByMentor(mentorId: string) {
        return this.prisma.assignment.findMany({
            where: { mentor_id: mentorId },
            include: {
                student: { include: { user: true } },
            },
            orderBy: { createdAt: 'desc' },
        });
    }

    async updateStatus(id: string, status: AssignmentStatus) {
        const assignment = await this.prisma.assignment.findUnique({ where: { id } });
        if (!assignment) throw new NotFoundException('Assignment not found');

        return this.prisma.assignment.update({
            where: { id },
            data: { status },
        });
    }
}
