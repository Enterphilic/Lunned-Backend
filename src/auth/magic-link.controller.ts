import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthTokenService } from './auth-token.service';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';

@ApiTags('auth')
@Controller('auth')
export class MagicLinkController {
  private readonly logger = new Logger(MagicLinkController.name);

  constructor(
    private authTokenService: AuthTokenService,
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post('request-magic-link')
  @ApiOperation({ summary: 'Request a magic link token' })
  @ApiResponse({
    status: 200,
    description: 'Token generated and "sent" via console.',
  })
  async requestMagicLink(@Body('email') email: string) {
    if (!email) {
      throw new BadRequestException('Email is required');
    }

    const user = await this.usersService.findByEmail(email);
    if (!user) {
      // For security, don't reveal if user exists or not
      return {
        message: 'If you have an account, a login token has been sent.',
      };
    }

    const token = await this.authTokenService.generateToken(email);

    // Simulate sending email by logging to terminal
    this.logger.log(
      `\n\n========================================\nMAGIC LINK TOKEN FOR ${email}: ${token}\n========================================\n\n`,
    );

    return { message: 'If you have an account, a login token has been sent.' };
  }

  @Post('verify-magic-link')
  @ApiOperation({ summary: 'Verify magic link token and login' })
  @ApiResponse({ status: 200, description: 'Login successful, returns JWT.' })
  async verifyMagicLink(@Body() body: { email: string; token: string }) {
    const { email, token } = body;

    if (!email || !token) {
      throw new BadRequestException('Email and token are required');
    }

    const isValid = await this.authTokenService.validateToken(email, token);
    if (!isValid) {
      throw new UnauthorizedException('Invalid or expired token');
    }

    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('User no longer exists');
    }
    return this.authService.loginWithUser(user);
  }
}
