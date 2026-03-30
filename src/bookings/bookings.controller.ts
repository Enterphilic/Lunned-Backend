import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('bookings')
@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new booking' })
  @ApiResponse({ status: 201, description: 'Booking successfully created.' })
  async create(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingsService.createBooking(createBookingDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a booking by ID' })
  @ApiResponse({ status: 200, description: 'Return the booking.' })
  async findOne(@Param('id') id: string) {
    return this.bookingsService.findBookingById(id);
  }

  @Get('student/:id')
  @ApiOperation({ summary: 'Get all bookings for a student' })
  @ApiResponse({
    status: 200,
    description: 'Return all bookings for the specified student.',
  })
  async findByStudent(@Param('id') id: string) {
    return this.bookingsService.findStudentBookings(id);
  }

  @Get('tutor/:id')
  @ApiOperation({ summary: 'Get all bookings for a tutor' })
  @ApiResponse({
    status: 200,
    description: 'Return all bookings for the specified tutor.',
  })
  async findByTutor(@Param('id') id: string) {
    return this.bookingsService.findTutorBookings(id);
  }

  @Get('mentor/:id')
  @ApiOperation({ summary: 'Get all bookings for a mentor' })
  @ApiResponse({
    status: 200,
    description: 'Return all bookings for the specified mentor.',
  })
  async findByMentor(@Param('id') id: string) {
    return this.bookingsService.findMentorBookings(id);
  }

  @Post(':id/complete')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Mark a booking as completed' })
  async complete(@Param('id') id: string, @Body('role') role: 'STUDENT' | 'TUTOR') {
    return this.bookingsService.completeBooking(id, role);
  }
}
