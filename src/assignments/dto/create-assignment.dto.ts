import {
    IsNotEmpty,
    IsString,
    IsOptional,
    IsUUID,
    IsDateString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAssignmentDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty()
    @IsUUID()
    @IsNotEmpty()
    student_id: string;

    @ApiPropertyOptional()
    @IsUUID()
    @IsOptional()
    tutor_id?: string;

    @ApiPropertyOptional()
    @IsUUID()
    @IsOptional()
    mentor_id?: string;

    @ApiPropertyOptional()
    @IsDateString()
    @IsOptional()
    dueDate?: string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    file_url?: string;
}
