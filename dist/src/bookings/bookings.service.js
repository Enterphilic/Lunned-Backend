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
exports.BookingsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let BookingsService = class BookingsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createBooking(dto) {
        return this.prisma.booking.create({
            data: {
                student_id: dto.student_id,
                tutor_id: dto.tutor_id,
                mentor_id: dto.mentor_id,
                type: dto.type,
                startTime: new Date(dto.startTime),
                endTime: new Date(dto.endTime),
                subject: dto.subject,
                goals: dto.goals,
                duration_weeks: dto.duration_weeks,
                days_of_week: dto.days_of_week,
            },
        });
    }
    async findBookingById(id) {
        const booking = await this.prisma.booking.findUnique({
            where: { id },
            include: {
                tutor: { include: { user: true } },
                mentor: { include: { user: true } },
                student: { include: { user: true } },
            },
        });
        if (!booking)
            throw new common_1.NotFoundException('Booking not found');
        return booking;
    }
    async findStudentBookings(studentId) {
        return this.prisma.booking.findMany({
            where: { student_id: studentId },
            include: {
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
                startTime: 'asc',
            },
        });
    }
    async findTutorBookings(tutorId) {
        return this.prisma.booking.findMany({
            where: { tutor_id: tutorId },
            include: {
                student: {
                    include: {
                        user: true,
                    },
                },
            },
            orderBy: {
                startTime: 'asc',
            },
        });
    }
    async findMentorBookings(mentorId) {
        return this.prisma.booking.findMany({
            where: { mentor_id: mentorId },
            include: {
                student: {
                    include: {
                        user: true,
                    },
                },
            },
            orderBy: {
                startTime: 'asc',
            },
        });
    }
    async completeBooking(id, role) {
        const booking = await this.prisma.booking.findUnique({ where: { id } });
        if (!booking)
            throw new common_1.NotFoundException('Booking not found');
        let newStatus = booking.status;
        if (role === 'STUDENT') {
            newStatus = booking.status === 'COMPLETED_BY_TUTOR' ? 'COMPLETED' : 'COMPLETED_BY_STUDENT';
        }
        else {
            newStatus = booking.status === 'COMPLETED_BY_STUDENT' ? 'COMPLETED' : 'COMPLETED_BY_TUTOR';
        }
        return this.prisma.booking.update({
            where: { id },
            data: { status: newStatus },
        });
    }
};
exports.BookingsService = BookingsService;
exports.BookingsService = BookingsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BookingsService);
//# sourceMappingURL=bookings.service.js.map