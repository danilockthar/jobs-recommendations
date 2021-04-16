import React from 'react';
import { Session } from 'auth/models/session';

export interface SessionContextInterface {
    isLoading: boolean;
    session: Session;
    setSession: (session: Session) => void;
    company: any;
    setCompany: (company: any) => void;
}

export const SessionContext = React.createContext<SessionContextInterface>({
    isLoading: true,
    session: new Session(),
    setSession: () => {
        /* Nothing to do here*/
    },
    company: {},
    setCompany: () => {
        /* Nothing to do here*/
    },
});
