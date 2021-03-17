import { useLocalSession } from 'auth/helpers/session.hooks';
import { ApiAuthService } from 'auth/services/auth/api-auth.service';

export enum Role {
    Person = 'person',
    Company = 'company',
}
export class UserDto {
    constructor(
        public id: number,
        public firstName: string,
        public lastName: string,
        public username: string,
        public password: string,
        public roles: Role[],
    ) {}
    getFirstRole(): Role | undefined {
        if (this.roles.length == 0) {
            return;
        }
        return this.roles[0];
    }
}
export class RegisterInput {
    constructor(
        public firstName: string,
        public lastName: string,
        public username: string,
        public password: string,
        public roles: Role[],
    ) {}
}
export class LoginInput {
    constructor(public password: string, public username: string) {}
}
export class LoginOutput {
    constructor(public accessToken: string) {}
}
export class SendResetPasswordMailInput {
    constructor(public email: string) {}
}
export class ResetPasswordInput {
    constructor(public password: string, public repeatPassword: string) {}
}

export interface AuthService {
    register(input: RegisterInput): Promise<LoginOutput>;
    login(input: LoginInput): Promise<LoginOutput>;
    logout(): Promise<void>;
    me(): Promise<UserDto>;
    sendResetPasswordMail(input: SendResetPasswordMailInput): Promise<void>;
    resetPassword(token: string, input: ResetPasswordInput): Promise<void>;
}

export const useAPIAuthService = (): AuthService => {
    const [getSession, setSession, removeSession] = useLocalSession();
    return new ApiAuthService(getSession, setSession, removeSession);
};
