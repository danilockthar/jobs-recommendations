import axios from 'axios';
import { DisconnectService } from './disconect.service';
import { Session } from 'auth/models/session';

export class APIDisconnectLinkedInService implements DisconnectService {
    private readonly session: Session;
    private readonly saveSession: (session: Session) => void;

    constructor(session: Session, saveSession: (session: Session) => void) {
        this.session = session;
        this.saveSession = saveSession;
    }

    async linkedinDisconnect(userid: string, typeuser: string): Promise<boolean> {
        try {
            await axios(`${process.env.REACT_APP_API_BASE_URL}/${typeuser}/disconnect`, {
                headers: { Authorization: 'Bearer ' + this.session.getToken() },
            });
            return true;
        } catch (error) {
            throw error;
        }
    }
}
