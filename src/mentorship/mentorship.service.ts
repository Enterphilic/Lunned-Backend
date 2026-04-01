import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMentorRequestDto } from './dto/create-mentor-request.dto';

@Injectable()
export class MentorshipService {
    constructor(private prisma: PrismaService) { }

    async createRequest(dto: CreateMentorRequestDto) {
        return this.prisma.mentorRequest.create({
            data: dto,
        });
    }

    async findAllRequests() {
        return this.prisma.mentorRequest.findMany({
            orderBy: { createdAt: 'desc' },
        });
    }

    async findOneRequest(id: string) {
        return this.prisma.mentorRequest.findUnique({
            where: { id },
        });
    }

    async updateRequestStatus(id: string, status: string) {
        return this.prisma.mentorRequest.update({
            where: { id },
            data: { status },
        });
    }

    async assignMentor(id: string, mentor_id: string) {
        return this.prisma.mentorRequest.update({
            where: { id },
            data: {
                mentor_id,
                status: 'ASSIGNED'
            },
        });
    }
}
