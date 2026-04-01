import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMentorRequestDto {
    @ApiProperty({ description: 'Full name of the requester' })
    @IsString()
    @IsNotEmpty()
    fullName: string;

    @ApiProperty({ description: 'Email address' })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ description: 'Gender of the requester', required: false })
    @IsString()
    @IsOptional()
    gender?: string;

    @ApiProperty({ description: 'Country of the requester', required: false })
    @IsString()
    @IsOptional()
    country?: string;

    @ApiProperty({ description: 'Profession or area of expertise', required: false })
    @IsString()
    @IsOptional()
    profession?: string;

    @ApiProperty({ description: 'Message or goals', required: false })
    @IsString()
    @IsOptional()
    message?: string;

    @ApiProperty({ description: 'Type of request: become or find', required: false })
    @IsString()
    @IsOptional()
    mentorType?: string;
}
