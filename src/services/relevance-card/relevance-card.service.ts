import { APIrelevanceCardService } from './api-relevance-card.service';
import { useLocalSession } from 'auth/helpers/session.hooks';

export interface UserRelevanceInterface {
    id?: number;
    profile?: string;
    name?: string;
    company?: string;
    industry?: string;
    experience?: string;
}

export interface RelevanceCardService {
    getUserRelevance(): Promise<any>;
    getCompanyData(): Promise<any>;
}
export const useApiRelevanceCardService = (): RelevanceCardService => {
    const [getSession, setSession] = useLocalSession();
    const session = getSession();
    return new APIrelevanceCardService(session, setSession);
};
