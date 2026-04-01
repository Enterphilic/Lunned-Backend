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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MentorshipController = void 0;
const common_1 = require("@nestjs/common");
const mentorship_service_1 = require("./mentorship.service");
const create_mentor_request_dto_1 = require("./dto/create-mentor-request.dto");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
let MentorshipController = class MentorshipController {
    mentorshipService;
    constructor(mentorshipService) {
        this.mentorshipService = mentorshipService;
    }
    async create(dto) {
        return this.mentorshipService.createRequest(dto);
    }
    async findAll() {
        return this.mentorshipService.findAllRequests();
    }
    async updateStatus(id, status) {
        return this.mentorshipService.updateRequestStatus(id, status);
    }
    async assign(id, mentor_id) {
        return this.mentorshipService.assignMentor(id, mentor_id);
    }
};
exports.MentorshipController = MentorshipController;
__decorate([
    (0, common_1.Post)('request'),
    (0, swagger_1.ApiOperation)({ summary: 'Submit a mentorship request (find or become)' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Request successfully submitted.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_mentor_request_dto_1.CreateMentorRequestDto]),
    __metadata("design:returntype", Promise)
], MentorshipController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('requests'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all mentorship requests (Admin only)' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MentorshipController.prototype, "findAll", null);
__decorate([
    (0, common_1.Patch)('requests/:id/status'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update mentorship request status (Admin only)' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], MentorshipController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Post)('requests/:id/assign'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Assign a mentor to a request (Admin only)' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('mentor_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], MentorshipController.prototype, "assign", null);
exports.MentorshipController = MentorshipController = __decorate([
    (0, swagger_1.ApiTags)('mentorship'),
    (0, common_1.Controller)('mentorship'),
    __metadata("design:paramtypes", [mentorship_service_1.MentorshipService])
], MentorshipController);
//# sourceMappingURL=mentorship.controller.js.map