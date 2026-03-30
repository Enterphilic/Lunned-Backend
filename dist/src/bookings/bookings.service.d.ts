import { PrismaService } from '../prisma/prisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';
export declare class BookingsService {
    private prisma;
    constructor(prisma: PrismaService);
    createBooking(dto: CreateBookingDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        type: import("@prisma/client").$Enums.BookingType;
        student_id: string | null;
        tutor_id: string | null;
        mentor_id: string | null;
        startTime: Date;
        endTime: Date;
        subject: string | null;
        goals: string | null;
        duration_weeks: number | null;
        days_of_week: string[];
        status: import("@prisma/client").$Enums.BookingStatus;
        is_paid: boolean;
    }>;
    findBookingById(id: string): Promise<{
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
        student: ({
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
        type: import("@prisma/client").$Enums.BookingType;
        student_id: string | null;
        tutor_id: string | null;
        mentor_id: string | null;
        startTime: Date;
        endTime: Date;
        subject: string | null;
        goals: string | null;
        duration_weeks: number | null;
        days_of_week: string[];
        status: import("@prisma/client").$Enums.BookingStatus;
        is_paid: boolean;
    }>;
    findStudentBookings(studentId: string): Promise<({
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
        type: import("@prisma/client").$Enums.BookingType;
        student_id: string | null;
        tutor_id: string | null;
        mentor_id: string | null;
        startTime: Date;
        endTime: Date;
        subject: string | null;
        goals: string | null;
        duration_weeks: number | null;
        days_of_week: string[];
        status: import("@prisma/client").$Enums.BookingStatus;
        is_paid: boolean;
    })[]>;
    findTutorBookings(tutorId: string): Promise<({
        student: ({
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
        }) | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        type: import("@prisma/client").$Enums.BookingType;
        student_id: string | null;
        tutor_id: string | null;
        mentor_id: string | null;
        startTime: Date;
        endTime: Date;
        subject: string | null;
        goals: string | null;
        duration_weeks: number | null;
        days_of_week: string[];
        status: import("@prisma/client").$Enums.BookingStatus;
        is_paid: boolean;
    })[]>;
    findMentorBookings(mentorId: string): Promise<({
        student: ({
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
        }) | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        type: import("@prisma/client").$Enums.BookingType;
        student_id: string | null;
        tutor_id: string | null;
        mentor_id: string | null;
        startTime: Date;
        endTime: Date;
        subject: string | null;
        goals: string | null;
        duration_weeks: number | null;
        days_of_week: string[];
        status: import("@prisma/client").$Enums.BookingStatus;
        is_paid: boolean;
    })[]>;
    completeBooking(id: string, role: 'STUDENT' | 'TUTOR'): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        type: import("@prisma/client").$Enums.BookingType;
        student_id: string | null;
        tutor_id: string | null;
        mentor_id: string | null;
        startTime: Date;
        endTime: Date;
        subject: string | null;
        goals: string | null;
        duration_weeks: number | null;
        days_of_week: string[];
        status: import("@prisma/client").$Enums.BookingStatus;
        is_paid: boolean;
    }>;
}
