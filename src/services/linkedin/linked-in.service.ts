import { useLocalSession } from 'auth/helpers/session.hooks';
import { LinkedInPersonDataDto } from 'services/linkedin/dtos/linked-in-person-data.dto';
import { ApiLinkedInService } from 'services/linkedin/api-linked-in.service';

export interface LinkedInService {
    findLinkedInPerson(): Promise<LinkedInPersonDataDto>;
    connectLinkedInPerson(): Promise<LinkedInPersonDataDto>;
    disconnectLinkedInPerson(): Promise<LinkedInPersonDataDto>;
}
export const useAPILinkedInService = (): LinkedInService => {
    const [getSession] = useLocalSession();
    const session = getSession();
    return new ApiLinkedInService(session);
};
