import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { UpdatePayoutDto } from './dto/update-payout.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User successfully registered.' })
  @ApiResponse({ status: 409, description: 'Email already in use.' })
  async register(@Body() registerUserDto: RegisterUserDto) {
    return this.usersService.registerUser(registerUserDto);
  }

  @Post('payout-details')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update professional payout details' })
  @ApiResponse({ status: 200, description: 'Payout details updated.' })
  async updatePayout(@Req() req: any, @Body() dto: UpdatePayoutDto) {
    return this.usersService.updatePayoutDetails(req.user.userId, dto);
  }

  @Post('profile')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update user profile details' })
  @ApiResponse({ status: 200, description: 'Profile updated.' })
  async updateProfile(@Req() req: any, @Body() dto: UpdateUserDto) {
    return this.usersService.updateProfile(req.user.userId, dto);
  }
}
