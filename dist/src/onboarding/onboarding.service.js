"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnboardingService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let OnboardingService = class OnboardingService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getOnboardingStatus(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            include: {
                tutor_profile: true,
                mentor_profile: true,
            },
        });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        if (user.role === 'TUTOR') {
            return {
                role: 'TUTOR',
                completed: user.tutor_profile?.onboarding_completed || false,
                subjects_count: user.tutor_profile?.subjects?.length || 0,
                has_video: !!user.tutor_profile?.teaching_video_url,
            };
        }
        if (user.role === 'MENTOR') {
            return {
                role: 'MENTOR',
                completed: user.mentor_profile?.onboarding_completed || false,
                expertise_count: user.mentor_profile?.expertise?.length || 0,
                has_video: !!user.mentor_profile?.teaching_video_url,
            };
        }
        return { role: user.role, completed: true };
    }
    async updateSubjects(userId, subjects) {
        if (subjects.length < 5) {
            throw new common_1.BadRequestException('A minimum of 5 subjects/expertise areas is required');
        }
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        if (user.role === 'TUTOR') {
            return this.prisma.tutorProfile.update({
                where: { userId },
                data: { subjects },
            });
        }
        if (user.role === 'MENTOR') {
            return this.prisma.mentorProfile.update({
                where: { userId },
                data: { expertise: subjects },
            });
        }
        throw new common_1.BadRequestException('Only Tutors and Mentors can update subjects');
    }
    async updateVideo(userId, videoUrl) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        if (user.role === 'TUTOR') {
            return this.prisma.tutorProfile.update({
                where: { userId },
                data: { teaching_video_url: videoUrl },
            });
        }
        if (user.role === 'MENTOR') {
            return this.prisma.mentorProfile.update({
                where: { userId },
                data: { teaching_video_url: videoUrl },
            });
        }
        throw new common_1.BadRequestException('Only Tutors and Mentors can upload a teaching video');
    }
    async completeOnboarding(userId) {
        const status = await this.getOnboardingStatus(userId);
        if (status.role === 'TUTOR') {
            if ((status.subjects_count ?? 0) < 5 || !status.has_video) {
                throw new common_1.BadRequestException('Incomplete onboarding requirements');
            }
            return this.prisma.tutorProfile.update({
                where: { userId },
                data: { onboarding_completed: true },
            });
        }
        if (status.role === 'MENTOR') {
            if ((status.expertise_count ?? 0) < 5 || !status.has_video) {
                throw new common_1.BadRequestException('Incomplete onboarding requirements');
            }
            return this.prisma.mentorProfile.update({
                where: { userId },
                data: { onboarding_completed: true },
            });
        }
        return { message: 'Onboarding not required for this role' };
    }
};
exports.OnboardingService = OnboardingService;
exports.OnboardingService = OnboardingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OnboardingService);
//# sourceMappingURL=onboarding.service.js.map