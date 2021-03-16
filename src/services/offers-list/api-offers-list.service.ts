import { OfferListService } from './offers-list.service';
import axios from 'axios';
import { Session } from 'auth/models/session';

export class APIOffersListService implements OfferListService {
    private readonly session: Session;

    constructor(session: Session) {
        this.session = session;
    }

    async getOffersByRelevance(): Promise<any[]> {
        try {
            const response = await axios.get(process.env.REACT_APP_API_BASE_URL + '/jobs', {
                headers: { Authorization: 'Bearer ' + this.session.getToken() },
            });

            const json = response.data;
            return json;
        } catch (error) {
            throw error;
        }
    }
}
