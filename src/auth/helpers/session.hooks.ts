import { serialize } from 'class-transformer';
import { useContext } from 'react';
import { SessionContext } from 'auth/helpers/session.context';
import { Session } from 'auth/models/session';

export const SESSION_STORAGE_SESSION_KEY = 'SESSION_STORAGE_SESSION_KEY';

export type SessionHook = () => [() => Session, (session: Session) => void, () => void, boolean];

export const useLocalSession: SessionHook = () => {
    const { isLoading, session, setSession } = useContext(SessionContext);

    const setSessionOnLocalStorage = (session: Session) => {
        window.sessionStorage.setItem(SESSION_STORAGE_SESSION_KEY, serialize(session));
        setSession(session);
    };

    const killSession = () => {
        window.sessionStorage.removeItem(SESSION_STORAGE_SESSION_KEY);
        setSession(new Session());
    };

    const getSession = (): Session => {
        if (session.isAuthenticated() && session.isExpired()) {
            setSessionOnLocalStorage(new Session());
            return new Session();
        }
        return session;
    };

    return [getSession, setSessionOnLocalStorage, killSession, isLoading];
};
