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
exports.AssignmentsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let AssignmentsService = class AssignmentsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        return this.prisma.assignment.create({
            data: {
                title: dto.title,
                description: dto.description,
                student_id: dto.student_id,
                tutor_id: dto.tutor_id,
                mentor_id: dto.mentor_id,
                dueDate: dto.dueDate ? new Date(dto.dueDate) : null,
                file_url: dto.file_url,
            },
        });
    }
    async findByStudent(studentId) {
        return this.prisma.assignment.findMany({
            where: { student_id: studentId },
            include: {
                tutor: { include: { user: true } },
                mentor: { include: { user: true } },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findByTutor(tutorId) {
        return this.prisma.assignment.findMany({
            where: { tutor_id: tutorId },
            include: {
                student: { include: { user: true } },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findByMentor(mentorId) {
        return this.prisma.assignment.findMany({
            where: { mentor_id: mentorId },
            include: {
                student: { include: { user: true } },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async updateStatus(id, status) {
        const assignment = await this.prisma.assignment.findUnique({ where: { id } });
        if (!assignment)
            throw new common_1.NotFoundException('Assignment not found');
        return this.prisma.assignment.update({
            where: { id },
            data: { status },
        });
    }
};
exports.AssignmentsService = AssignmentsService;
exports.AssignmentsService = AssignmentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AssignmentsService);
//# sourceMappingURL=assignments.service.js.map