import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterUserDto } from './dto/register-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  async registerUser(dto: RegisterUserDto) {
    const email = dto.email.trim().toLowerCase();
    const {
      password,
      full_name,
      phone,
      role,
      agreed_to_terms,
      interests,
      education_level,
      subjects,
      experience,
      hourly_rate,
      bio,
      expertise,
      industries,
      industry,
      career_goals,
      learning_mode,
      cv_url,
      id_url,
      id_type,
      years_of_experience,
      teaching_video_url,
    } = dto;

    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        full_name,
        phone,
        role: role || 'STUDENT',
        agreed_to_terms,
        bio,
      },
    });

    // Create corresponding profile
    if (user.role === 'STUDENT' || user.role === 'MENTEE') {
      await this.prisma.studentProfile.create({
        data: {
          userId: user.id,
          interests: interests || [],
          education_level: education_level || null,
          industry: industry || null,
          career_goals: career_goals || null,
          learning_mode: learning_mode || null,
        },
      });
    } else if (user.role === 'TUTOR') {
      await this.prisma.tutorProfile.create({
        data: {
          userId: user.id,
          subjects: subjects || [],
          experience: experience || null,
          hourly_rate: hourly_rate || null,
          cv_url: cv_url || null,
          id_url: id_url || null,
          id_type: id_type || null,
          teaching_video_url: teaching_video_url || null,
        },
      });
    } else if (user.role === 'MENTOR') {
      await this.prisma.mentorProfile.create({
        data: {
          userId: user.id,
          expertise: expertise || [],
          industries: industries || [],
          experience: experience || null,
          years_of_experience: years_of_experience || 0,
          cv_url: cv_url || null,
          id_url: id_url || null,
          id_type: id_type || null,
          teaching_video_url: teaching_video_url || null,
        },
      });
    }

    const fullUser = await this.findById(user.id);

    if (!fullUser) {
      throw new Error('Newly created user not found');
    }

    // Return user with profiles to satisfy frontend expectations (especially student signup)
    return {
      ...fullUser,
      profiles: {
        student: fullUser.student_profile,
        tutor: fullUser.tutor_profile,
        mentor: fullUser.mentor_profile,
      },
    };
  }

  async findByEmail(email: string) {
    const cleanEmail = email.trim().toLowerCase();
    return this.prisma.user.findUnique({
      where: { email: cleanEmail },
      include: {
        student_profile: true,
        tutor_profile: true,
        mentor_profile: true,
      },
    });
  }

  async findById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        student_profile: true,
        tutor_profile: true,
        mentor_profile: true,
      },
    });
  }

  async updatePayoutDetails(userId: string, dto: any) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new Error('User not found');

    if (user.role === 'TUTOR') {
      return this.prisma.tutorProfile.update({
        where: { userId },
        data: {
          bank_name: dto.bank_name,
          account_number: dto.account_number,
          account_name: dto.account_name,
        },
      });
    } else if (user.role === 'MENTOR') {
      return this.prisma.mentorProfile.update({
        where: { userId },
        data: {
          bank_name: dto.bank_name,
          account_number: dto.account_number,
          account_name: dto.account_name,
        },
      });
    }
    throw new Error('Only Tutors and Mentors can update payout details');
  }

  async updateProfile(userId: string, dto: any) {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        full_name: dto.full_name,
        phone: dto.phone,
        bio: dto.bio,
        avatar: dto.avatar,
      },
    });
  }

  async updatePassword(userId: string, hashedPass: string) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { password: hashedPass },
    });
  }

  async findPublicProfile(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        tutor_profile: true,
        mentor_profile: true,
      },
    });

    if (!user) return null;

    return {
      id: user.id,
      full_name: user.full_name,
      avatar: user.avatar,
      role: user.role,
      bio: user.bio,
      tutor_profile: user.tutor_profile,
      mentor_profile: user.mentor_profile,
    };
  }
}
