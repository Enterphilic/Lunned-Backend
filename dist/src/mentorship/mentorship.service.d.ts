import { PrismaService } from '../prisma/prisma.service';
import { CreateMentorRequestDto } from './dto/create-mentor-request.dto';
export declare class MentorshipService {
    private prisma;
    constructor(prisma: PrismaService);
    createRequest(dto: CreateMentorRequestDto): Promise<{
        id: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        mentor_id: string | null;
        status: string;
        message: string | null;
        fullName: string;
        gender: string | null;
        country: string | null;
        profession: string | null;
        mentorType: string | null;
    }>;
    findAllRequests(): Promise<{
        id: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        mentor_id: string | null;
        status: string;
        message: string | null;
        fullName: string;
        gender: string | null;
        country: string | null;
        profession: string | null;
        mentorType: string | null;
    }[]>;
    findOneRequest(id: string): Promise<{
        id: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        mentor_id: string | null;
        status: string;
        message: string | null;
        fullName: string;
        gender: string | null;
        country: string | null;
        profession: string | null;
        mentorType: string | null;
    } | null>;
    updateRequestStatus(id: string, status: string): Promise<{
        id: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        mentor_id: string | null;
        status: string;
        message: string | null;
        fullName: string;
        gender: string | null;
        country: string | null;
        profession: string | null;
        mentorType: string | null;
    }>;
    assignMentor(id: string, mentor_id: string): Promise<{
        id: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        mentor_id: string | null;
        status: string;
        message: string | null;
        fullName: string;
        gender: string | null;
        country: string | null;
        profession: string | null;
        mentorType: string | null;
    }>;
}
