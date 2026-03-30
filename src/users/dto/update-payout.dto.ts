import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePayoutDto {
    @ApiProperty({ description: 'The name of the bank' })
    @IsString()
    @IsNotEmpty()
    bank_name: string;

    @ApiProperty({ description: 'The bank account number' })
    @IsString()
    @IsNotEmpty()
    account_number: string;

    @ApiProperty({ description: 'The name on the bank account' })
    @IsString()
    @IsNotEmpty()
    account_name: string;
}
