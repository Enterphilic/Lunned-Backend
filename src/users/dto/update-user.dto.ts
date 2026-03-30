import { IsOptional, IsString, IsUrl } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
    @ApiPropertyOptional({ example: 'John Doe' })
    @IsString()
    @IsOptional()
    full_name?: string;

    @ApiPropertyOptional({ example: '+1234567890' })
    @IsString()
    @IsOptional()
    phone?: string;

    @ApiPropertyOptional({ example: 'Software developer and part-time tutor.' })
    @IsString()
    @IsOptional()
    bio?: string;

    @ApiPropertyOptional({ example: 'https://cloudinary.com/asdf.jpg' })
    @IsString()
    @IsOptional()
    avatar?: string;
}
