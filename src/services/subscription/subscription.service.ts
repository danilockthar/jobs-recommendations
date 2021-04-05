import { APIsubscriptionService } from './api-subscription.service';
import { useLocalSession } from 'auth/helpers/session.hooks';

export interface InputDto {
    priceId: string;
    productId: string;
    companyId: number;
}

export interface SubscriptionService {
    getCheckoutSessionId(input: InputDto): Promise<any>;
    getStripeProducts(): Promise<any>;
    getCostumerPortal(): Promise<any>;
}
export const useAPIsubscriptionService = (): SubscriptionService => {
    const [getSession, setSession] = useLocalSession();
    const session = getSession();
    return new APIsubscriptionService(session, setSession);
};
