import { IsString, IsEmail, IsOptional, IsObject } from 'class-validator';

export class CreateExamEnrollmentDto {
    @IsString()
    examId: string;

    @IsString()
    examName: string;

    @IsString()
    fullName: string;

    @IsEmail()
    email: string;

    @IsString()
    phone: string;

    @IsString()
    level: string;

    @IsOptional()
    @IsObject()
    registrationData?: Record<string, any>;
    @IsOptional()
    @IsString()
    userId?: string;
}
