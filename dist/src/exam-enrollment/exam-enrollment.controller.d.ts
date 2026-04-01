import { ExamEnrollmentService } from './exam-enrollment.service';
import { CreateExamEnrollmentDto } from './dto/create-exam-enrollment.dto';
export declare class ExamEnrollmentController {
    private readonly examEnrollmentService;
    constructor(examEnrollmentService: ExamEnrollmentService);
    create(dto: CreateExamEnrollmentDto): Promise<{
        id: string;
        email: string;
        phone: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string | null;
        status: string;
        fullName: string;
        examId: string;
        examName: string;
        level: string;
        registrationData: import("@prisma/client/runtime/client").JsonValue | null;
    }>;
    findAll(): Promise<{
        id: string;
        email: string;
        phone: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string | null;
        status: string;
        fullName: string;
        examId: string;
        examName: string;
        level: string;
        registrationData: import("@prisma/client/runtime/client").JsonValue | null;
    }[]>;
    findAllByUserId(userId: string): Promise<{
        id: string;
        email: string;
        phone: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string | null;
        status: string;
        fullName: string;
        examId: string;
        examName: string;
        level: string;
        registrationData: import("@prisma/client/runtime/client").JsonValue | null;
    }[]>;
    updateStatus(id: string, status: string): Promise<{
        id: string;
        email: string;
        phone: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string | null;
        status: string;
        fullName: string;
        examId: string;
        examName: string;
        level: string;
        registrationData: import("@prisma/client/runtime/client").JsonValue | null;
    }>;
}
