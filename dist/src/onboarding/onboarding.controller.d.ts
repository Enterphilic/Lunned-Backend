import { OnboardingService } from './onboarding.service';
export declare class OnboardingController {
    private readonly onboardingService;
    constructor(onboardingService: OnboardingService);
    getOnboardingStatus(req: any): Promise<{
        role: string;
        completed: boolean;
        subjects_count: number;
        has_video: boolean;
        expertise_count?: undefined;
    } | {
        role: string;
        completed: boolean;
        expertise_count: number;
        has_video: boolean;
        subjects_count?: undefined;
    } | {
        role: "STUDENT" | "ADMIN" | "MENTEE" | "STAFF_ONBOARDING" | "STAFF_MATCHING";
        completed: boolean;
        subjects_count?: undefined;
        has_video?: undefined;
        expertise_count?: undefined;
    }>;
    updateSubjects(req: any, body: {
        subjects: string[];
    }): Promise<{
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
    } | {
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
    }>;
    updateVideo(req: any, body: {
        videoUrl: string;
    }): Promise<{
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
    } | {
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
    }>;
    completeOnboarding(req: any): Promise<{
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
    } | {
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
    } | {
        message: string;
    }>;
}
