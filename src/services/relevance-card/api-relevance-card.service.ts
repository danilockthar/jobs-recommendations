import { RelevanceCardService } from './relevance-card.service';
import axios from 'axios';
import { Session } from 'auth/models/session';

export class APIrelevanceCardService implements RelevanceCardService {
    constructor(private session: Session, private setSession: (session: Session) => void) {}

    async getUserRelevance(): Promise<any> {
        try {
            const response = await axios.get(process.env.REACT_APP_API_BASE_URL + '/person/me', {
                headers: { Authorization: 'Bearer ' + this.session.getToken() },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async getCompanyData(): Promise<any> {
        try {
            const response = await axios.get(process.env.REACT_APP_API_BASE_URL + '/company/me', {
                headers: { Authorization: 'Bearer ' + this.session.getToken() },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}
