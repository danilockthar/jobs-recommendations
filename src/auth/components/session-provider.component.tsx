import React, { useEffect, useState } from 'react';
import { SESSION_STORAGE_SESSION_KEY } from 'auth/helpers/session.hooks';
import { SessionContext } from 'auth/helpers/session.context';
import { Session } from 'auth/models/session';
import { deserialize } from 'class-transformer';
import AuthRoute from 'auth/components/auth-route.component';

const SessionProvider: React.FC = (props) => {
    const [session, setSession] = useState(new Session());
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        onViewMounted().finally();
    }, []);
    const onViewMounted = async () => {
        const storedSession = await window.sessionStorage.getItem(SESSION_STORAGE_SESSION_KEY);
        if (storedSession) {
            const sessionModel = deserialize(Session, storedSession);
            setSession(sessionModel);
        }
        setIsLoading(false);
    };

    return (
        <SessionContext.Provider value={{ isLoading, session, setSession }}>
            <AuthRoute>{props.children}</AuthRoute>
        </SessionContext.Provider>
    );
};

export default SessionProvider;
