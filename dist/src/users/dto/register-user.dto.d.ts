export declare class RegisterUserDto {
    email: string;
    password: string;
    full_name: string;
    phone?: string;
    role?: 'STUDENT' | 'TUTOR' | 'MENTOR' | 'MENTEE';
    agreed_to_terms: boolean;
    interests?: string[];
    education_level?: string;
    subjects?: string[];
    experience?: string;
    hourly_rate?: number;
    bio?: string;
    expertise?: string[];
    industries?: string[];
    industry?: string;
    career_goals?: string;
    learning_mode?: string;
    cv_url?: string;
    id_url?: string;
    id_type?: string;
    years_of_experience?: number;
    teaching_video_url?: string;
}
