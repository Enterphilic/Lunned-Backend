import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OnboardingService {
  constructor(private prisma: PrismaService) {}

  async getOnboardingStatus(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        tutor_profile: true,
        mentor_profile: true,
      },
    });

    if (!user) throw new NotFoundException('User not found');

    if (user.role === 'TUTOR') {
      return {
        role: 'TUTOR',
        completed: user.tutor_profile?.onboarding_completed || false,
        subjects_count: user.tutor_profile?.subjects?.length || 0,
        has_video: !!user.tutor_profile?.teaching_video_url,
      };
    }

    if (user.role === 'MENTOR') {
      return {
        role: 'MENTOR',
        completed: user.mentor_profile?.onboarding_completed || false,
        expertise_count: user.mentor_profile?.expertise?.length || 0,
        has_video: !!user.mentor_profile?.teaching_video_url,
      };
    }

    return { role: user.role, completed: true }; // Students/Mentees don't have this onboarding
  }

  async updateSubjects(userId: string, subjects: string[]) {
    if (subjects.length < 5) {
      throw new BadRequestException(
        'A minimum of 5 subjects/expertise areas is required',
      );
    }

    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    if (user.role === 'TUTOR') {
      return this.prisma.tutorProfile.update({
        where: { userId },
        data: { subjects },
      });
    }

    if (user.role === 'MENTOR') {
      return this.prisma.mentorProfile.update({
        where: { userId },
        data: { expertise: subjects },
      });
    }

    throw new BadRequestException(
      'Only Tutors and Mentors can update subjects',
    );
  }

  async updateVideo(userId: string, videoUrl: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    if (user.role === 'TUTOR') {
      return this.prisma.tutorProfile.update({
        where: { userId },
        data: { teaching_video_url: videoUrl },
      });
    }

    if (user.role === 'MENTOR') {
      return this.prisma.mentorProfile.update({
        where: { userId },
        data: { teaching_video_url: videoUrl },
      });
    }

    throw new BadRequestException(
      'Only Tutors and Mentors can upload a teaching video',
    );
  }

  async completeOnboarding(userId: string) {
    const status = await this.getOnboardingStatus(userId);

    if (status.role === 'TUTOR') {
      if ((status.subjects_count ?? 0) < 5 || !status.has_video) {
        throw new BadRequestException('Incomplete onboarding requirements');
      }
      return this.prisma.tutorProfile.update({
        where: { userId },
        data: { onboarding_completed: true },
      });
    }

    if (status.role === 'MENTOR') {
      if ((status.expertise_count ?? 0) < 5 || !status.has_video) {
        throw new BadRequestException('Incomplete onboarding requirements');
      }
      return this.prisma.mentorProfile.update({
        where: { userId },
        data: { onboarding_completed: true },
      });
    }

    return { message: 'Onboarding not required for this role' };
  }
}
