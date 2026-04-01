"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = __importStar(require("bcryptjs"));
let AdminService = class AdminService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getPlatformStats() {
        const [totalUsers, totalStudents, totalTutors, totalMentors, pendingVerifications, unassignedBookingsCount, pendingMentorRequestsCount,] = await Promise.all([
            this.prisma.user.count(),
            this.prisma.user.count({ where: { role: 'STUDENT' } }),
            this.prisma.user.count({ where: { role: 'TUTOR' } }),
            this.prisma.user.count({ where: { role: 'MENTOR' } }),
            this.getTotalPendingVerifications(),
            this.prisma.booking.count({ where: { tutor_id: null, mentor_id: null } }),
            this.prisma.mentorRequest.count({ where: { status: 'PENDING' } }),
        ]);
        return {
            totalUsers,
            totalStudents,
            totalTutors,
            totalMentors,
            pendingVerifications,
            unassignedRequests: unassignedBookingsCount + pendingMentorRequestsCount,
        };
    }
    async getTotalPendingVerifications() {
        const [pendingTutors, pendingMentors] = await Promise.all([
            this.prisma.tutorProfile.count({
                where: { verification_status: 'PENDING', onboarding_completed: true },
            }),
            this.prisma.mentorProfile.count({
                where: { verification_status: 'PENDING', onboarding_completed: true },
            }),
        ]);
        return pendingTutors + pendingMentors;
    }
    async getPendingVerifications() {
        const [tutors, mentors] = await Promise.all([
            this.prisma.tutorProfile.findMany({
                where: { verification_status: 'PENDING', onboarding_completed: true },
                include: { user: true },
            }),
            this.prisma.mentorProfile.findMany({
                where: { verification_status: 'PENDING', onboarding_completed: true },
                include: { user: true },
            }),
        ]);
        return { tutors, mentors };
    }
    async approveProfessional(profileId, role) {
        if (role === 'TUTOR') {
            const profile = await this.prisma.tutorProfile.findUnique({
                where: { id: profileId },
            });
            if (!profile)
                throw new common_1.NotFoundException('Tutor profile not found');
            return this.prisma.tutorProfile.update({
                where: { id: profileId },
                data: { verification_status: 'APPROVED' },
            });
        }
        else {
            const profile = await this.prisma.mentorProfile.findUnique({
                where: { id: profileId },
            });
            if (!profile)
                throw new common_1.NotFoundException('Mentor profile not found');
            return this.prisma.mentorProfile.update({
                where: { id: profileId },
                data: { verification_status: 'APPROVED' },
            });
        }
    }
    async rejectProfessional(profileId, role, reason) {
        if (!reason)
            throw new common_1.BadRequestException('Rejection reason is required');
        if (role === 'TUTOR') {
            const profile = await this.prisma.tutorProfile.findUnique({
                where: { id: profileId },
            });
            if (!profile)
                throw new common_1.NotFoundException('Tutor profile not found');
            return this.prisma.tutorProfile.update({
                where: { id: profileId },
                data: { verification_status: 'REJECTED' },
            });
        }
        else {
            const profile = await this.prisma.mentorProfile.findUnique({
                where: { id: profileId },
            });
            if (!profile)
                throw new common_1.NotFoundException('Mentor profile not found');
            return this.prisma.mentorProfile.update({
                where: { id: profileId },
                data: { verification_status: 'REJECTED' },
            });
        }
    }
    async getAllUsers(page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const [users, total] = await Promise.all([
            this.prisma.user.findMany({
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
                include: {
                    student_profile: true,
                    tutor_profile: true,
                    mentor_profile: true,
                },
            }),
            this.prisma.user.count(),
        ]);
        return {
            users,
            meta: {
                total,
                page,
                lastPage: Math.ceil(total / limit),
            },
        };
    }
    async getUnassignedRequests() {
        return this.prisma.booking.findMany({
            where: {
                tutor_id: null,
                mentor_id: null,
            },
            include: {
                student: {
                    include: {
                        user: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }
    async getPendingMentorRequests() {
        return this.prisma.mentorRequest.findMany({
            where: { status: 'PENDING' },
            orderBy: { createdAt: 'desc' },
        });
    }
    async getUnassignedCount() {
        const [bookingCount, mentorRequestCount] = await Promise.all([
            this.prisma.booking.count({ where: { tutor_id: null, mentor_id: null } }),
            this.prisma.mentorRequest.count({ where: { status: 'PENDING' } }),
        ]);
        return bookingCount + mentorRequestCount;
    }
    async assignProfessional(bookingId, professionalId, role) {
        const booking = await this.prisma.booking.findUnique({
            where: { id: bookingId },
        });
        if (!booking)
            throw new common_1.NotFoundException('Booking request not found');
        if (role === 'TUTOR') {
            const tutor = await this.prisma.tutorProfile.findUnique({
                where: { id: professionalId },
            });
            if (!tutor)
                throw new common_1.NotFoundException('Tutor not found');
            return this.prisma.booking.update({
                where: { id: bookingId },
                data: {
                    tutor_id: professionalId,
                    status: 'CONFIRMED',
                },
            });
        }
        else {
            const mentor = await this.prisma.mentorProfile.findUnique({
                where: { id: professionalId },
            });
            if (!mentor)
                throw new common_1.NotFoundException('Mentor not found');
            return this.prisma.booking.update({
                where: { id: bookingId },
                data: {
                    mentor_id: professionalId,
                    status: 'CONFIRMED',
                },
            });
        }
    }
    async getEligibleProfessionals(subjects, role) {
        if (role === 'TUTOR') {
            return this.prisma.tutorProfile.findMany({
                where: {
                    verification_status: 'APPROVED',
                    subjects: {
                        hasSome: subjects,
                    },
                },
                include: {
                    user: true,
                },
            });
        }
        else {
            return this.prisma.mentorProfile.findMany({
                where: {
                    verification_status: 'APPROVED',
                    expertise: {
                        hasSome: subjects,
                    },
                },
                include: {
                    user: true,
                },
            });
        }
    }
    async updateUserRole(userId, role) {
        return this.prisma.user.update({
            where: { id: userId },
            data: { role: role },
        });
    }
    async createUser(data) {
        const { password, ...rest } = data;
        const hashedPassword = await bcrypt.hash(password, 10);
        return this.prisma.user.create({
            data: {
                ...rest,
                password: hashedPassword,
                agreed_to_terms: true,
            },
        });
    }
    async approveBooking(bookingId) {
        const booking = await this.prisma.booking.findUnique({ where: { id: bookingId } });
        if (!booking)
            throw new common_1.NotFoundException('Booking not found');
        return this.prisma.booking.update({
            where: { id: bookingId },
            data: {
                status: 'APPROVED_BY_ADMIN',
                is_paid: true
            },
        });
    }
    async getPendingPayouts() {
        return this.prisma.booking.findMany({
            where: {
                status: {
                    in: ['COMPLETED', 'COMPLETED_BY_STUDENT', 'COMPLETED_BY_TUTOR']
                },
                is_paid: false
            },
            include: {
                student: {
                    include: {
                        user: true,
                    },
                },
                tutor: {
                    include: {
                        user: true,
                    },
                },
                mentor: {
                    include: {
                        user: true,
                    },
                },
            },
            orderBy: {
                updatedAt: 'desc',
            },
        });
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AdminService);
//# sourceMappingURL=admin.service.js.map