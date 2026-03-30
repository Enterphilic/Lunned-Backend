import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordDto {
    @ApiProperty({ description: 'The current password' })
    @IsString()
    currentPassword: string;

    @ApiProperty({ description: 'The new password' })
    @IsString()
    @MinLength(6)
    newPassword: string;
}
