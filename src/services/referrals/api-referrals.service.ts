import axios from 'axios';
import {
    ReferralsService,
    SendReferralInput,
    SendReferralOutput,
    AskReferralInput,
    AskReferralOutput,
} from 'services/referrals/referrals.service';
import { plainToClass } from 'class-transformer';
import { Session } from 'auth/models/session';

export class ApiReferralsService implements ReferralsService {
    constructor(private session: Session) {}

    async send(input: SendReferralInput): Promise<SendReferralOutput> {
        const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/referrals/save-send`, input, {
            headers: { Authorization: 'Bearer ' + this.session.getToken() },
        });
        return plainToClass(SendReferralOutput, response.data);
    }

    async getReferralJobs(): Promise<SendReferralOutput> {
        const response = await axios.get(process.env.REACT_APP_API_BASE_URL + '/referrals/my-referred-jobs', {
            headers: { Authorization: 'Bearer ' + this.session.getToken() },
        });
        return plainToClass(SendReferralOutput, response.data);
    }

    async askForReferral(input: AskReferralInput): Promise<any> {
        const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/referrals/ask-for-referral`, input, {
            headers: { Authorization: 'Bearer ' + this.session.getToken() },
        });
        return plainToClass(AskReferralOutput, response.data);
    }
}
