import { ApiReferralsService } from 'services/referrals/api-referrals.service';
import { useLocalSession } from 'auth/helpers/session.hooks';

export interface SendReferralInput {
    job: number;
    referredEmail: string;
}

export class SendReferralOutput {
    job?: number;
    referredEmail?: string;
}

export interface ReferralsService {
    send(input: SendReferralInput): Promise<SendReferralOutput>;
    getReferralJobs(): Promise<any>;
}
export const useApiReferralService = (): ReferralsService => {
    const [getSession] = useLocalSession();
    const session = getSession();
    return new ApiReferralsService(session);
};
