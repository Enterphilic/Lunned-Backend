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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = __importStar(require("bcryptjs"));
let UsersService = class UsersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async registerUser(dto) {
        const email = dto.email.trim().toLowerCase();
        const { password, full_name, phone, role, agreed_to_terms, interests, education_level, subjects, experience, hourly_rate, bio, expertise, industries, industry, career_goals, learning_mode, cv_url, id_url, id_type, years_of_experience, teaching_video_url, } = dto;
        const existingUser = await this.prisma.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            throw new common_1.ConflictException('Email already in use');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await this.prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                full_name,
                phone,
                role: role || 'STUDENT',
                agreed_to_terms,
                bio,
            },
        });
        if (user.role === 'STUDENT' || user.role === 'MENTEE') {
            await this.prisma.studentProfile.create({
                data: {
                    userId: user.id,
                    interests: interests || [],
                    education_level: education_level || null,
                    industry: industry || null,
                    career_goals: career_goals || null,
                    learning_mode: learning_mode || null,
                },
            });
        }
        else if (user.role === 'TUTOR') {
            await this.prisma.tutorProfile.create({
                data: {
                    userId: user.id,
                    subjects: subjects || [],
                    experience: experience || null,
                    hourly_rate: hourly_rate || null,
                    cv_url: cv_url || null,
                    id_url: id_url || null,
                    id_type: id_type || null,
                    teaching_video_url: teaching_video_url || null,
                },
            });
        }
        else if (user.role === 'MENTOR') {
            await this.prisma.mentorProfile.create({
                data: {
                    userId: user.id,
                    expertise: expertise || [],
                    industries: industries || [],
                    experience: experience || null,
                    years_of_experience: years_of_experience || 0,
                    cv_url: cv_url || null,
                    id_url: id_url || null,
                    id_type: id_type || null,
                    teaching_video_url: teaching_video_url || null,
                },
            });
        }
        const fullUser = await this.findById(user.id);
        if (!fullUser) {
            throw new Error('Newly created user not found');
        }
        return {
            ...fullUser,
            profiles: {
                student: fullUser.student_profile,
                tutor: fullUser.tutor_profile,
                mentor: fullUser.mentor_profile,
            },
        };
    }
    async findByEmail(email) {
        const cleanEmail = email.trim().toLowerCase();
        return this.prisma.user.findUnique({
            where: { email: cleanEmail },
            include: {
                student_profile: true,
                tutor_profile: true,
                mentor_profile: true,
            },
        });
    }
    async findById(id) {
        return this.prisma.user.findUnique({
            where: { id },
            include: {
                student_profile: true,
                tutor_profile: true,
                mentor_profile: true,
            },
        });
    }
    async updatePayoutDetails(userId, dto) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user)
            throw new Error('User not found');
        if (user.role === 'TUTOR') {
            return this.prisma.tutorProfile.update({
                where: { userId },
                data: {
                    bank_name: dto.bank_name,
                    account_number: dto.account_number,
                    account_name: dto.account_name,
                },
            });
        }
        else if (user.role === 'MENTOR') {
            return this.prisma.mentorProfile.update({
                where: { userId },
                data: {
                    bank_name: dto.bank_name,
                    account_number: dto.account_number,
                    account_name: dto.account_name,
                },
            });
        }
        throw new Error('Only Tutors and Mentors can update payout details');
    }
    async updateProfile(userId, dto) {
        return this.prisma.user.update({
            where: { id: userId },
            data: {
                full_name: dto.full_name,
                phone: dto.phone,
                bio: dto.bio,
                avatar: dto.avatar,
            },
        });
    }
    async updatePassword(userId, hashedPass) {
        return this.prisma.user.update({
            where: { id: userId },
            data: { password: hashedPass },
        });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map