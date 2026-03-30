import { PrismaService } from '../prisma/prisma.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { AssignmentStatus } from '@prisma/client';
export declare class AssignmentsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateAssignmentDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        title: string;
        student_id: string;
        tutor_id: string | null;
        mentor_id: string | null;
        status: import("@prisma/client").$Enums.AssignmentStatus;
        dueDate: Date | null;
        file_url: string | null;
    }>;
    findByStudent(studentId: string): Promise<({
        mentor: ({
            user: {
                id: string;
                email: string;
                password: string;
                full_name: string;
                phone: string | null;
                role: import("@prisma/client").$Enums.Role;
                agreed_to_terms: boolean;
                createdAt: Date;
                updatedAt: Date;
                bio: string | null;
                avatar: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            experience: string | null;
            cv_url: string | null;
            id_type: string | null;
            id_url: string | null;
            onboarding_completed: boolean;
            teaching_video_url: string | null;
            verification_status: string;
            account_name: string | null;
            account_number: string | null;
            bank_name: string | null;
            expertise: string[];
            industries: string[];
            years_of_experience: number | null;
        }) | null;
        tutor: ({
            user: {
                id: string;
                email: string;
                password: string;
                full_name: string;
                phone: string | null;
                role: import("@prisma/client").$Enums.Role;
                agreed_to_terms: boolean;
                createdAt: Date;
                updatedAt: Date;
                bio: string | null;
                avatar: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            subjects: string[];
            experience: string | null;
            hourly_rate: number | null;
            cv_url: string | null;
            id_type: string | null;
            id_url: string | null;
            onboarding_completed: boolean;
            teaching_video_url: string | null;
            verification_status: string;
            account_name: string | null;
            account_number: string | null;
            bank_name: string | null;
        }) | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        title: string;
        student_id: string;
        tutor_id: string | null;
        mentor_id: string | null;
        status: import("@prisma/client").$Enums.AssignmentStatus;
        dueDate: Date | null;
        file_url: string | null;
    })[]>;
    findByTutor(tutorId: string): Promise<({
        student: {
            user: {
                id: string;
                email: string;
                password: string;
                full_name: string;
                phone: string | null;
                role: import("@prisma/client").$Enums.Role;
                agreed_to_terms: boolean;
                createdAt: Date;
                updatedAt: Date;
                bio: string | null;
                avatar: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            education_level: string | null;
            interests: string[];
            career_goals: string | null;
            industry: string | null;
            learning_mode: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        title: string;
        student_id: string;
        tutor_id: string | null;
        mentor_id: string | null;
        status: import("@prisma/client").$Enums.AssignmentStatus;
        dueDate: Date | null;
        file_url: string | null;
    })[]>;
    findByMentor(mentorId: string): Promise<({
        student: {
            user: {
                id: string;
                email: string;
                password: string;
                full_name: string;
                phone: string | null;
                role: import("@prisma/client").$Enums.Role;
                agreed_to_terms: boolean;
                createdAt: Date;
                updatedAt: Date;
                bio: string | null;
                avatar: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            education_level: string | null;
            interests: string[];
            career_goals: string | null;
            industry: string | null;
            learning_mode: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        title: string;
        student_id: string;
        tutor_id: string | null;
        mentor_id: string | null;
        status: import("@prisma/client").$Enums.AssignmentStatus;
        dueDate: Date | null;
        file_url: string | null;
    })[]>;
    updateStatus(id: string, status: AssignmentStatus): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        title: string;
        student_id: string;
        tutor_id: string | null;
        mentor_id: string | null;
        status: import("@prisma/client").$Enums.AssignmentStatus;
        dueDate: Date | null;
        file_url: string | null;
    }>;
}
