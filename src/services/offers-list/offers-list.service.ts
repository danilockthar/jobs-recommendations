import { APIOffersListService } from './api-offers-list.service';
import { useLocalSession } from 'auth/helpers/session.hooks';

export interface OfferListService {
    getOffersByRelevance(): Promise<any[]>;
}
export const useApiOffersListService = (): OfferListService => {
    const [getSession] = useLocalSession();
    const session = getSession();
    return new APIOffersListService(session);
};
