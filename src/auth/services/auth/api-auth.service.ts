import {
    AuthService,
    LoginInput,
    LoginOutput,
    RegisterInput,
    ResetPasswordInput,
    SendResetPasswordMailInput,
    UserDto,
} from 'auth/services/auth/auth.service';
import axios from 'axios';
import { plainToClass } from 'class-transformer';
import { Session } from 'auth/models/session';

export class ApiAuthService implements AuthService {
    constructor(
        private getSession: () => Session,
        private saveSession: (session: Session) => void,
        private removeSession: () => void,
    ) {}

    async login(input: LoginInput): Promise<LoginOutput> {
        try {
            const response = await axios.post(process.env.REACT_APP_API_BASE_URL + '/auth/login', input);
            const output = plainToClass(LoginOutput, response.data as unknown);
            const user = await this.getUser(output.accessToken);
            this.saveSession(new Session(output.accessToken, user));
            return output;
        } catch (e) {
            throw e.response.data.code;
        }
    }

    async me(): Promise<UserDto> {
        const response = await axios.get(process.env.REACT_APP_API_BASE_URL + '/auth/me', {
            headers: { Authorization: 'Bearer ' + this.getSession().getToken() },
        });
        return plainToClass(UserDto, response.data as unknown);
    }

    async register(input: RegisterInput): Promise<LoginOutput> {
        try {
            const response = await axios.post(process.env.REACT_APP_API_BASE_URL + '/auth/register', input);
            const output = plainToClass(LoginOutput, response.data as unknown);
            return output;
        } catch (e) {
            throw e.response.data.code;
        }
    }

    async logout(): Promise<void> {
        await this.removeSession();
    }

    async getUser(token: string): Promise<UserDto> {
        const userResponse = await axios.get(process.env.REACT_APP_API_BASE_URL + '/auth/me', {
            headers: { Authorization: 'Bearer ' + token },
        });
        return plainToClass(UserDto, userResponse.data as unknown);
    }

    async sendResetPasswordMail(input: SendResetPasswordMailInput): Promise<void> {
        return await axios.post(process.env.REACT_APP_API_BASE_URL + '/auth/sendResetPasswordMail', input);
    }

    async resetPassword(token: string, input: ResetPasswordInput): Promise<void> {
        return await axios.post(process.env.REACT_APP_API_BASE_URL + '/auth/resetPassword', input, {
            headers: { Authorization: 'Bearer ' + token },
        });
    }
    async confirmEmail(token: string): Promise<void> {
        const response = await axios.get(process.env.REACT_APP_API_BASE_URL + '/auth/email', {
            headers: { Authorization: 'Bearer ' + token },
        });

        return response.data;
    }
}
