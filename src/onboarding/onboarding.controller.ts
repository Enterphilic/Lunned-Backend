import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { OnboardingService } from './onboarding.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('onboarding')
@Controller('onboarding')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class OnboardingController {
  constructor(private readonly onboardingService: OnboardingService) {}

  @Get('status')
  @ApiOperation({ summary: 'Get professional onboarding status' })
  getOnboardingStatus(@Req() req: any) {
    return this.onboardingService.getOnboardingStatus(req.user.userId);
  }

  @Post('subjects')
  @ApiOperation({ summary: 'Update subjects/expertise (minimum 5)' })
  updateSubjects(@Req() req: any, @Body() body: { subjects: string[] }) {
    return this.onboardingService.updateSubjects(
      req.user.userId,
      body.subjects,
    );
  }

  @Post('video')
  @ApiOperation({ summary: 'Update teaching demo video URL' })
  updateVideo(@Req() req: any, @Body() body: { videoUrl: string }) {
    return this.onboardingService.updateVideo(req.user.userId, body.videoUrl);
  }

  @Post('complete')
  @ApiOperation({ summary: 'Complete professional onboarding' })
  completeOnboarding(@Req() req: any) {
    return this.onboardingService.completeOnboarding(req.user.userId);
  }
}
