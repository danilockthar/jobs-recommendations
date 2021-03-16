import { UserDto } from 'auth/services/auth/auth.service';
import jwtDecode, { JwtPayload } from 'jwt-decode';

export class Session {
    private readonly expirationTimestamp?: number;

    constructor(private token?: string, private user?: UserDto) {
        if (token) {
            const decoded = jwtDecode<JwtPayload>(token);
            this.expirationTimestamp = decoded.exp;
        }
    }

    getToken(): string | undefined {
        return this.token;
    }

    getUser(): UserDto | undefined {
        return this.user;
    }

    isExpired(): boolean {
        if (!this.expirationTimestamp) {
            return false;
        }
        const todayTimestamp = Math.floor(Date.now() / 1000);
        return this.expirationTimestamp < todayTimestamp;
    }

    isAuthenticated(): boolean {
        console.log('isAuthenticated', this.token);
        return !!this.token;
    }
}
