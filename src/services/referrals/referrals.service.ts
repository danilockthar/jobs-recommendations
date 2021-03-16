import { ApiReferralsService } from 'services/referrals/api-referrals.service';
import { useLocalSession } from 'auth/helpers/session.hooks';

export interface SendReferralInput {
    jobId: number;
    referredEmail: string;
}

export class SendReferralOutput {
    jobId?: number;
    referredEmail?: string;
}

export interface ReferralsService {
    send(input: SendReferralInput): Promise<SendReferralOutput>;
}
export const useApiReferralService = (): ReferralsService => {
    const [getSession] = useLocalSession();
    const session = getSession();
    return new ApiReferralsService(session);
};
