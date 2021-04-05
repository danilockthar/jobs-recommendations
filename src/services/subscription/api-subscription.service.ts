import axios from 'axios';
import { Session } from 'auth/models/session';
import { InputDto, SubscriptionService } from './subscription.service';

export class APIsubscriptionService implements SubscriptionService {
    constructor(private session: Session, private setSession: (session: Session) => void) {}

    async getCheckoutSessionId(input: InputDto): Promise<any> {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/gateway/checkout-session`, input, {
                headers: { Authorization: 'Bearer ' + this.session.getToken() },
            });
            // return plainToClass(AskReferralOutput, response.data);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async getStripeProducts(): Promise<any> {
        try {
            const response = await axios.get(process.env.REACT_APP_API_BASE_URL + '/gateway/products', {
                headers: { Authorization: 'Bearer ' + this.session.getToken() },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    async getCostumerPortal(): Promise<any> {
        try {
            const response = await axios.get(process.env.REACT_APP_API_BASE_URL + '/gateway/customer-portal-session', {
                headers: { Authorization: 'Bearer ' + this.session.getToken() },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}
