import { ApiReferralsService } from 'services/referrals/api-referrals.service';
import { useLocalSession } from 'auth/helpers/session.hooks';

export interface SendReferralInput {
    job: number;
    referredEmail: string;
}

export interface AskReferralInput {
    job: number;
    referrerEmail: string;
}

export class SendReferralOutput {
    job?: number;
    referredEmail?: string;
}
export class AskReferralOutput {
    job?: number;
    referrerEmail?: string;
}

export interface ReferralsService {
    send(input: SendReferralInput): Promise<SendReferralOutput>;
    getReferralJobs(): Promise<any>;
    askForReferral(input: AskReferralInput): Promise<any>;
}
export const useApiReferralService = (): ReferralsService => {
    const [getSession] = useLocalSession();
    const session = getSession();
    return new ApiReferralsService(session);
};
