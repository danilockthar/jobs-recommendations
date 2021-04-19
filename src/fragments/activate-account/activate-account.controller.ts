import { useEffect, useState } from 'react';
import { ActivateAccountController } from 'fragments/activate-account/interfaces';
import { useAPIAuthService } from 'auth/services/auth/auth.service';
import { useLocation } from 'react-router';

export const useActivateAccountController = (
    authService = useAPIAuthService(),
): /* <--Dependency Injections  like services hooks */
ActivateAccountController => {
    const [tokenQuery, setTokenQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isValidated, setIsValidated] = useState(false);

    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }
    const query = useQuery();

    useEffect(() => {
        if (query.get('confirmation_token')) {
            confirmEmail(query.get('confirmation_token') || '');
        }
    }, [query.get('confirmation_token')]);

    const setQueryURL = (query: string) => {
        setTokenQuery(query);
    };

    const confirmEmail = async (token: string) => {
        setIsLoading(true);
        authService
            .confirmEmail(token)
            .then(() => {
                setIsValidated(true);
            })
            .catch((err) => {
                setIsValidated(false);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };
    return { setQueryURL, isLoading, confirmEmail, isValidated };
};
