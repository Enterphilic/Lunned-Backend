import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) { }

  async getPlatformStats() {
    const [
      totalUsers,
      totalStudents,
      totalTutors,
      totalMentors,
      pendingVerifications,
      unassignedCount,
    ] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.user.count({ where: { role: 'STUDENT' } }),
      this.prisma.user.count({ where: { role: 'TUTOR' } }),
      this.prisma.user.count({ where: { role: 'MENTOR' } }),
      this.getTotalPendingVerifications(),
      this.prisma.booking.count({ where: { tutor_id: null, mentor_id: null } }),
    ]);

    return {
      totalUsers,
      totalStudents,
      totalTutors,
      totalMentors,
      pendingVerifications,
      unassignedRequests: unassignedCount,
    };
  }

  private async getTotalPendingVerifications() {
    const [pendingTutors, pendingMentors] = await Promise.all([
      this.prisma.tutorProfile.count({
        where: { verification_status: 'PENDING', onboarding_completed: true },
      }),
      this.prisma.mentorProfile.count({
        where: { verification_status: 'PENDING', onboarding_completed: true },
      }),
    ]);
    return pendingTutors + pendingMentors;
  }

  async getPendingVerifications() {
    const [tutors, mentors] = await Promise.all([
      this.prisma.tutorProfile.findMany({
        where: { verification_status: 'PENDING', onboarding_completed: true },
        include: { user: true },
      }),
      this.prisma.mentorProfile.findMany({
        where: { verification_status: 'PENDING', onboarding_completed: true },
        include: { user: true },
      }),
    ]);

    return { tutors, mentors };
  }

  async approveProfessional(profileId: string, role: 'TUTOR' | 'MENTOR') {
    if (role === 'TUTOR') {
      const profile = await this.prisma.tutorProfile.findUnique({
        where: { id: profileId },
      });
      if (!profile) throw new NotFoundException('Tutor profile not found');
      return this.prisma.tutorProfile.update({
        where: { id: profileId },
        data: { verification_status: 'APPROVED' },
      });
    } else {
      const profile = await this.prisma.mentorProfile.findUnique({
        where: { id: profileId },
      });
      if (!profile) throw new NotFoundException('Mentor profile not found');
      return this.prisma.mentorProfile.update({
        where: { id: profileId },
        data: { verification_status: 'APPROVED' },
      });
    }
  }

  async rejectProfessional(
    profileId: string,
    role: 'TUTOR' | 'MENTOR',
    reason: string,
  ) {
    if (!reason) throw new BadRequestException('Rejection reason is required');

    if (role === 'TUTOR') {
      const profile = await this.prisma.tutorProfile.findUnique({
        where: { id: profileId },
      });
      if (!profile) throw new NotFoundException('Tutor profile not found');
      return this.prisma.tutorProfile.update({
        where: { id: profileId },
        data: { verification_status: 'REJECTED' },
      });
    } else {
      const profile = await this.prisma.mentorProfile.findUnique({
        where: { id: profileId },
      });
      if (!profile) throw new NotFoundException('Mentor profile not found');
      return this.prisma.mentorProfile.update({
        where: { id: profileId },
        data: { verification_status: 'REJECTED' },
      });
    }
  }

  async getAllUsers(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          student_profile: true,
          tutor_profile: true,
          mentor_profile: true,
        },
      }),
      this.prisma.user.count(),
    ]);

    return {
      users,
      meta: {
        total,
        page,
        lastPage: Math.ceil(total / limit),
      },
    };
  }

  async getUnassignedRequests() {
    return this.prisma.booking.findMany({
      where: {
        tutor_id: null,
        mentor_id: null,
      },
      include: {
        student: {
          include: {
            user: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getUnassignedCount() {
    return this.prisma.booking.count({
      where: {
        tutor_id: null,
        mentor_id: null,
      },
    });
  }

  async assignProfessional(
    bookingId: string,
    professionalId: string,
    role: 'TUTOR' | 'MENTOR',
  ) {
    const booking = await this.prisma.booking.findUnique({
      where: { id: bookingId },
    });
    if (!booking) throw new NotFoundException('Booking request not found');

    if (role === 'TUTOR') {
      const tutor = await this.prisma.tutorProfile.findUnique({
        where: { id: professionalId },
      });
      if (!tutor) throw new NotFoundException('Tutor not found');
      return this.prisma.booking.update({
        where: { id: bookingId },
        data: {
          tutor_id: professionalId,
          status: 'CONFIRMED',
        },
      });
    } else {
      const mentor = await this.prisma.mentorProfile.findUnique({
        where: { id: professionalId },
      });
      if (!mentor) throw new NotFoundException('Mentor not found');
      return this.prisma.booking.update({
        where: { id: bookingId },
        data: {
          mentor_id: professionalId,
          status: 'CONFIRMED',
        },
      });
    }
  }

  async getEligibleProfessionals(subjects: string[], role: 'TUTOR' | 'MENTOR') {
    if (role === 'TUTOR') {
      return this.prisma.tutorProfile.findMany({
        where: {
          verification_status: 'APPROVED',
          subjects: {
            hasSome: subjects,
          },
        },
        include: {
          user: true,
        },
      });
    } else {
      return this.prisma.mentorProfile.findMany({
        where: {
          verification_status: 'APPROVED',
          expertise: {
            hasSome: subjects,
          },
        },
        include: {
          user: true,
        },
      });
    }
  }

  async updateUserRole(userId: string, role: string) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { role: role as any },
    });
  }

  async createUser(data: any) {
    const { password, ...rest } = data;
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.prisma.user.create({
      data: {
        ...rest,
        password: hashedPassword,
        agreed_to_terms: true,
      },
    });
  }
  async approveBooking(bookingId: string) {
    const booking = await this.prisma.booking.findUnique({ where: { id: bookingId } });
    if (!booking) throw new NotFoundException('Booking not found');

    return this.prisma.booking.update({
      where: { id: bookingId },
      data: {
        status: 'APPROVED_BY_ADMIN',
        is_paid: true
      },
    });
  }
}
