import {
  IsNotEmpty,
  IsString,
  IsEnum,
  IsDateString,
  IsOptional,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BookingType } from '@prisma/client';

export class CreateBookingDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  student_id: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  tutor_id?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  mentor_id?: string;

  @ApiProperty({ enum: BookingType })
  @IsEnum(BookingType)
  @IsNotEmpty()
  type: BookingType;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  startTime: string;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  endTime: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  subject?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  goals?: string;

  @ApiPropertyOptional()
  @IsOptional()
  duration_weeks?: number;

  @ApiPropertyOptional()
  @IsOptional()
  days_of_week?: string[];
}
