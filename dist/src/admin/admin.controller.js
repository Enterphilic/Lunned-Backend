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
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const admin_service_1 = require("./admin.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const swagger_1 = require("@nestjs/swagger");
let AdminController = class AdminController {
    adminService;
    constructor(adminService) {
        this.adminService = adminService;
    }
    getStats() {
        return this.adminService.getPlatformStats();
    }
    getPendingVerifications() {
        return this.adminService.getPendingVerifications();
    }
    approve(id, role) {
        return this.adminService.approveProfessional(id, role);
    }
    reject(id, role, reason) {
        return this.adminService.rejectProfessional(id, role, reason);
    }
    getAllUsers(page, limit) {
        return this.adminService.getAllUsers(page ? parseInt(page) : 1, limit ? parseInt(limit) : 10);
    }
    getUnassignedRequests() {
        return this.adminService.getUnassignedRequests();
    }
    getUnassignedCount() {
        return this.adminService.getUnassignedCount();
    }
    getMentorshipRequests() {
        return this.adminService.getPendingMentorRequests();
    }
    getEligibleProfessionals(subjects, role) {
        const subjectList = subjects ? subjects.split(',') : [];
        return this.adminService.getEligibleProfessionals(subjectList, role);
    }
    assign(id, professionalId, role) {
        return this.adminService.assignProfessional(id, professionalId, role);
    }
    updateRole(id, role) {
        return this.adminService.updateUserRole(id, role);
    }
    create(data) {
        return this.adminService.createUser(data);
    }
    getPendingPayouts() {
        return this.adminService.getPendingPayouts();
    }
    approveBooking(id) {
        return this.adminService.approveBooking(id);
    }
};
exports.AdminController = AdminController;
__decorate([
    (0, common_1.Get)('stats'),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: 'Get platform-wide statistics' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getStats", null);
__decorate([
    (0, common_1.Get)('verifications/pending'),
    (0, roles_decorator_1.Roles)('ADMIN', 'STAFF_ONBOARDING'),
    (0, swagger_1.ApiOperation)({ summary: 'Get pending professional verifications' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getPendingVerifications", null);
__decorate([
    (0, common_1.Post)('verifications/:id/approve'),
    (0, roles_decorator_1.Roles)('ADMIN', 'STAFF_ONBOARDING'),
    (0, swagger_1.ApiOperation)({ summary: 'Approve a professional profile' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('role')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "approve", null);
__decorate([
    (0, common_1.Post)('verifications/:id/reject'),
    (0, roles_decorator_1.Roles)('ADMIN', 'STAFF_ONBOARDING'),
    (0, swagger_1.ApiOperation)({ summary: 'Reject a professional profile' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('role')),
    __param(2, (0, common_1.Body)('reason')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "reject", null);
__decorate([
    (0, common_1.Get)('users'),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all users with pagination' }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getAllUsers", null);
__decorate([
    (0, common_1.Get)('matching/requests'),
    (0, roles_decorator_1.Roles)('ADMIN', 'STAFF_MATCHING'),
    (0, swagger_1.ApiOperation)({ summary: 'Get unassigned student requests' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getUnassignedRequests", null);
__decorate([
    (0, common_1.Get)('matching/requests/count'),
    (0, roles_decorator_1.Roles)('ADMIN', 'STAFF_MATCHING'),
    (0, swagger_1.ApiOperation)({ summary: 'Get count of unassigned student requests' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getUnassignedCount", null);
__decorate([
    (0, common_1.Get)('mentorship-requests'),
    (0, roles_decorator_1.Roles)('ADMIN', 'STAFF_MATCHING'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all pending mentorship requests (leads)' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getMentorshipRequests", null);
__decorate([
    (0, common_1.Get)('matching/eligible'),
    (0, roles_decorator_1.Roles)('ADMIN', 'STAFF_MATCHING'),
    (0, swagger_1.ApiOperation)({ summary: 'Get professionals eligible for matching' }),
    __param(0, (0, common_1.Query)('subjects')),
    __param(1, (0, common_1.Query)('role')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getEligibleProfessionals", null);
__decorate([
    (0, common_1.Post)('matching/:id/assign'),
    (0, roles_decorator_1.Roles)('ADMIN', 'STAFF_MATCHING'),
    (0, swagger_1.ApiOperation)({ summary: 'Manually assign a professional to a request' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('professionalId')),
    __param(2, (0, common_1.Body)('role')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "assign", null);
__decorate([
    (0, common_1.Post)('users/:id/role'),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a user role' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('role')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "updateRole", null);
__decorate([
    (0, common_1.Post)('users'),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new user/staff directly' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('bookings/payouts/pending'),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all completed bookings pending payout approval' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getPendingPayouts", null);
__decorate([
    (0, common_1.Post)('bookings/:id/approve'),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: 'Approve a completed booking for payment' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "approveBooking", null);
exports.AdminController = AdminController = __decorate([
    (0, swagger_1.ApiTags)('admin'),
    (0, common_1.Controller)('admin'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [admin_service_1.AdminService])
], AdminController);
//# sourceMappingURL=admin.controller.js.map