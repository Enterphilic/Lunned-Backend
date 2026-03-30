import { AuthTokenService } from './auth-token.service';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
export declare class MagicLinkController {
    private authTokenService;
    private authService;
    private usersService;
    private readonly logger;
    constructor(authTokenService: AuthTokenService, authService: AuthService, usersService: UsersService);
    requestMagicLink(email: string): Promise<{
        message: string;
    }>;
    verifyMagicLink(body: {
        email: string;
        token: string;
    }): Promise<{
        access_token: string;
        user: any;
    }>;
}
