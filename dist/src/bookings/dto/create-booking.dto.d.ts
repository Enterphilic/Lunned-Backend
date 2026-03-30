import { BookingType } from '@prisma/client';
export declare class CreateBookingDto {
    student_id: string;
    tutor_id?: string;
    mentor_id?: string;
    type: BookingType;
    startTime: string;
    endTime: string;
    subject?: string;
    goals?: string;
    duration_weeks?: number;
    days_of_week?: string[];
}
