import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(email: string, pass: string): Promise<any>;
    login(loginDto: LoginUserDto): Promise<{
        access_token: string;
        user: any;
    }>;
    loginWithUser(user: any): Promise<{
        access_token: string;
        user: any;
    }>;
    getUserProfile(userId: string): Promise<({
        mentor_profile: {
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
        } | null;
        student_profile: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            education_level: string | null;
            interests: string[];
            career_goals: string | null;
            industry: string | null;
            learning_mode: string | null;
        } | null;
        tutor_profile: {
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
        } | null;
    } & {
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
    }) | null>;
    changePassword(userId: string, currentPass: string, newPass: string): Promise<{
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
    }>;
}
