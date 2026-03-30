import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsOptional,
  IsBoolean,
  IsEnum,
  IsArray,
  IsNumber,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class RegisterUserDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123', minLength: 8 })
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty({ example: 'John Doe' })
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @ApiPropertyOptional({ example: '+1234567890' })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({
    enum: ['STUDENT', 'TUTOR', 'MENTOR', 'MENTEE'],
    default: 'STUDENT',
  })
  @IsEnum(['STUDENT', 'TUTOR', 'MENTOR', 'MENTEE'])
  @IsOptional()
  role?: 'STUDENT' | 'TUTOR' | 'MENTOR' | 'MENTEE';

  @ApiProperty({ example: true })
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true)
  agreed_to_terms: boolean;

  // Student specific
  @ApiPropertyOptional({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  interests?: string[];

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  education_level?: string;

  // Tutor specific
  @ApiPropertyOptional({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  subjects?: string[];

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  experience?: string;

  @ApiPropertyOptional()
  @IsOptional()
  hourly_rate?: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  bio?: string;

  // Mentor specific
  @ApiPropertyOptional({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  expertise?: string[];

  @ApiPropertyOptional({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  industries?: string[];

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  industry?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  career_goals?: string;

  @ApiPropertyOptional({ example: 'ONLINE' })
  @IsString()
  @IsOptional()
  learning_mode?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  cv_url?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  id_url?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  id_type?: string;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  years_of_experience?: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  teaching_video_url?: string;
}
