import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as crypto from 'crypto';

@Injectable()
export class AuthTokenService {
  constructor(private prisma: PrismaService) {}

  async generateToken(email: string): Promise<string> {
    // Generate a 6-digit numeric token
    const token = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes expiry

    await this.prisma.magicLinkToken.create({
      data: {
        email,
        token,
        expiresAt,
      },
    });

    return token;
  }

  async validateToken(email: string, token: string): Promise<boolean> {
    const tokenRecord = await this.prisma.magicLinkToken.findFirst({
      where: {
        email,
        token,
        expiresAt: {
          gt: new Date(),
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!tokenRecord) {
      return false;
    }

    // Delete the token after use
    await this.prisma.magicLinkToken.delete({
      where: { id: tokenRecord.id },
    });

    return true;
  }
}
