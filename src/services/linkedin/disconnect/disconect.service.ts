import { APIDisconnectLinkedInService } from './api-disconnect.service';
import { useLocalSession } from 'auth/helpers/session.hooks';

export interface DisconnectService {
    linkedinDisconnect(userid: string, typeuser: string): Promise<any>;
}
export const useApiDisconnectLinkedin = (): DisconnectService => {
    const [getSession, setSession] = useLocalSession();
    const session = getSession();
    return new APIDisconnectLinkedInService(session, setSession);
};
