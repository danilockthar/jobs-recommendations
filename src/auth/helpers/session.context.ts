import React from 'react';
import { Session } from 'auth/models/session';

export interface SessionContextInterface {
    isLoading: boolean;
    session: Session;
    setSession: (session: Session) => void;
}

export const SessionContext = React.createContext<SessionContextInterface>({
    isLoading: true,
    session: new Session(),
    setSession: () => {
        /* Nothing to do here*/
    },
});
