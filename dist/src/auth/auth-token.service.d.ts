import { PrismaService } from '../prisma/prisma.service';
export declare class AuthTokenService {
    private prisma;
    constructor(prisma: PrismaService);
    generateToken(email: string): Promise<string>;
    validateToken(email: string, token: string): Promise<boolean>;
}
