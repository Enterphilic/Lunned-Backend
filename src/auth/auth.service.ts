import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginDto: LoginUserDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.loginWithUser(user);
  }

  async loginWithUser(user: any) {
    const payload = {
      email: user.email,
      sub: user.id || user.userId,
      role: user.role,
    };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  async getUserProfile(userId: string) {
    return this.usersService.findById(userId);
  }

  async changePassword(userId: string, currentPass: string, newPass: string) {
    const user = await this.usersService.findById(userId);
    if (!user) throw new UnauthorizedException('User not found');

    const isMatch = await bcrypt.compare(currentPass, user.password);
    if (!isMatch) throw new UnauthorizedException('Current password incorrect');

    const hashedNewPassword = await bcrypt.hash(newPass, 10);
    return this.usersService.updatePassword(userId, hashedNewPassword);
  }
}
