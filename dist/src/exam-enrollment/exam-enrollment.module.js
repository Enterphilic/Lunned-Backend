"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExamEnrollmentModule = void 0;
const common_1 = require("@nestjs/common");
const exam_enrollment_controller_1 = require("./exam-enrollment.controller");
const exam_enrollment_service_1 = require("./exam-enrollment.service");
let ExamEnrollmentModule = class ExamEnrollmentModule {
};
exports.ExamEnrollmentModule = ExamEnrollmentModule;
exports.ExamEnrollmentModule = ExamEnrollmentModule = __decorate([
    (0, common_1.Module)({
        controllers: [exam_enrollment_controller_1.ExamEnrollmentController],
        providers: [exam_enrollment_service_1.ExamEnrollmentService],
        exports: [exam_enrollment_service_1.ExamEnrollmentService],
    })
], ExamEnrollmentModule);
//# sourceMappingURL=exam-enrollment.module.js.map