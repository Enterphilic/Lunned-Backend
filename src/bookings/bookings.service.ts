import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';

@Injectable()
export class BookingsService {
  constructor(private prisma: PrismaService) { }

  async createBooking(dto: CreateBookingDto) {
    return this.prisma.booking.create({
      data: {
        student_id: dto.student_id,
        tutor_id: dto.tutor_id,
        mentor_id: dto.mentor_id,
        type: dto.type,
        startTime: new Date(dto.startTime),
        endTime: new Date(dto.endTime),
        subject: dto.subject,
        goals: dto.goals,
        duration_weeks: dto.duration_weeks,
        days_of_week: dto.days_of_week,
      },
    });
  }

  async findBookingById(id: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { id },
      include: {
        tutor: { include: { user: true } },
        mentor: { include: { user: true } },
        student: { include: { user: true } },
      },
    });
    if (!booking) throw new NotFoundException('Booking not found');
    return booking;
  }

  async findStudentBookings(studentId: string) {
    return this.prisma.booking.findMany({
      where: { student_id: studentId },
      include: {
        tutor: {
          include: {
            user: true,
          },
        },
        mentor: {
          include: {
            user: true,
          },
        },
      },
      orderBy: {
        startTime: 'asc',
      },
    });
  }

  async findTutorBookings(tutorId: string) {
    return this.prisma.booking.findMany({
      where: { tutor_id: tutorId },
      include: {
        student: {
          include: {
            user: true,
          },
        },
      },
      orderBy: {
        startTime: 'asc',
      },
    });
  }

  async findMentorBookings(mentorId: string) {
    return this.prisma.booking.findMany({
      where: { mentor_id: mentorId },
      include: {
        student: {
          include: {
            user: true,
          },
        },
      },
      orderBy: {
        startTime: 'asc',
      },
    });
  }

  async completeBooking(id: string, role: 'STUDENT' | 'TUTOR') {
    const booking = await this.prisma.booking.findUnique({ where: { id } });
    if (!booking) throw new NotFoundException('Booking not found');

    let newStatus: any = booking.status;
    if (role === 'STUDENT') {
      newStatus = (booking.status as any) === 'COMPLETED_BY_TUTOR' ? 'COMPLETED' : 'COMPLETED_BY_STUDENT';
    } else {
      newStatus = (booking.status as any) === 'COMPLETED_BY_STUDENT' ? 'COMPLETED' : 'COMPLETED_BY_TUTOR';
    }

    return this.prisma.booking.update({
      where: { id },
      data: { status: newStatus },
    });
  }
}
