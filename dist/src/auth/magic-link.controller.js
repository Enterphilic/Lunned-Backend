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
var MagicLinkController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MagicLinkController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_token_service_1 = require("./auth-token.service");
const auth_service_1 = require("./auth.service");
const users_service_1 = require("../users/users.service");
let MagicLinkController = MagicLinkController_1 = class MagicLinkController {
    authTokenService;
    authService;
    usersService;
    logger = new common_1.Logger(MagicLinkController_1.name);
    constructor(authTokenService, authService, usersService) {
        this.authTokenService = authTokenService;
        this.authService = authService;
        this.usersService = usersService;
    }
    async requestMagicLink(email) {
        if (!email) {
            throw new common_1.BadRequestException('Email is required');
        }
        const user = await this.usersService.findByEmail(email);
        if (!user) {
            return {
                message: 'If you have an account, a login token has been sent.',
            };
        }
        const token = await this.authTokenService.generateToken(email);
        this.logger.log(`\n\n========================================\nMAGIC LINK TOKEN FOR ${email}: ${token}\n========================================\n\n`);
        return { message: 'If you have an account, a login token has been sent.' };
    }
    async verifyMagicLink(body) {
        const { email, token } = body;
        if (!email || !token) {
            throw new common_1.BadRequestException('Email and token are required');
        }
        const isValid = await this.authTokenService.validateToken(email, token);
        if (!isValid) {
            throw new common_1.UnauthorizedException('Invalid or expired token');
        }
        const user = await this.usersService.findByEmail(email);
        if (!user) {
            throw new common_1.UnauthorizedException('User no longer exists');
        }
        return this.authService.loginWithUser(user);
    }
};
exports.MagicLinkController = MagicLinkController;
__decorate([
    (0, common_1.Post)('request-magic-link'),
    (0, swagger_1.ApiOperation)({ summary: 'Request a magic link token' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Token generated and "sent" via console.',
    }),
    __param(0, (0, common_1.Body)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MagicLinkController.prototype, "requestMagicLink", null);
__decorate([
    (0, common_1.Post)('verify-magic-link'),
    (0, swagger_1.ApiOperation)({ summary: 'Verify magic link token and login' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Login successful, returns JWT.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MagicLinkController.prototype, "verifyMagicLink", null);
exports.MagicLinkController = MagicLinkController = MagicLinkController_1 = __decorate([
    (0, swagger_1.ApiTags)('auth'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_token_service_1.AuthTokenService,
        auth_service_1.AuthService,
        users_service_1.UsersService])
], MagicLinkController);
//# sourceMappingURL=magic-link.controller.js.map