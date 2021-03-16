import axios from 'axios';
import { ReferralsService, SendReferralInput, SendReferralOutput } from 'services/referrals/referrals.service';
import { plainToClass } from 'class-transformer';
import { Session } from 'auth/models/session';

export class ApiReferralsService implements ReferralsService {
    constructor(private session: Session) {}

    async send(input: SendReferralInput): Promise<SendReferralOutput> {
        const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/referrals/send`, input, {
            headers: { Authorization: 'Bearer ' + this.session.getToken() },
        });
        return plainToClass(SendReferralOutput, response.data);
    }
}
