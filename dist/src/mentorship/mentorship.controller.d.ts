import { MentorshipService } from './mentorship.service';
import { CreateMentorRequestDto } from './dto/create-mentor-request.dto';
export declare class MentorshipController {
    private readonly mentorshipService;
    constructor(mentorshipService: MentorshipService);
    create(dto: CreateMentorRequestDto): Promise<{
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
    findAll(): Promise<{
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
    updateStatus(id: string, status: string): Promise<{
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
    assign(id: string, mentor_id: string): Promise<{
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
