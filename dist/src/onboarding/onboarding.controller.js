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
exports.OnboardingController = void 0;
const common_1 = require("@nestjs/common");
const onboarding_service_1 = require("./onboarding.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const swagger_1 = require("@nestjs/swagger");
let OnboardingController = class OnboardingController {
    onboardingService;
    constructor(onboardingService) {
        this.onboardingService = onboardingService;
    }
    getOnboardingStatus(req) {
        return this.onboardingService.getOnboardingStatus(req.user.userId);
    }
    updateSubjects(req, body) {
        return this.onboardingService.updateSubjects(req.user.userId, body.subjects);
    }
    updateVideo(req, body) {
        return this.onboardingService.updateVideo(req.user.userId, body.videoUrl);
    }
    completeOnboarding(req) {
        return this.onboardingService.completeOnboarding(req.user.userId);
    }
};
exports.OnboardingController = OnboardingController;
__decorate([
    (0, common_1.Get)('status'),
    (0, swagger_1.ApiOperation)({ summary: 'Get professional onboarding status' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], OnboardingController.prototype, "getOnboardingStatus", null);
__decorate([
    (0, common_1.Post)('subjects'),
    (0, swagger_1.ApiOperation)({ summary: 'Update subjects/expertise (minimum 5)' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], OnboardingController.prototype, "updateSubjects", null);
__decorate([
    (0, common_1.Post)('video'),
    (0, swagger_1.ApiOperation)({ summary: 'Update teaching demo video URL' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], OnboardingController.prototype, "updateVideo", null);
__decorate([
    (0, common_1.Post)('complete'),
    (0, swagger_1.ApiOperation)({ summary: 'Complete professional onboarding' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], OnboardingController.prototype, "completeOnboarding", null);
exports.OnboardingController = OnboardingController = __decorate([
    (0, swagger_1.ApiTags)('onboarding'),
    (0, common_1.Controller)('onboarding'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [onboarding_service_1.OnboardingService])
], OnboardingController);
//# sourceMappingURL=onboarding.controller.js.map