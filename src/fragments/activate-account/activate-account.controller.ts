import { useState } from 'react';
import { ActivateAccountController } from 'fragments/activate-account/interfaces';
import { useAPIAuthService } from 'auth/services/auth/auth.service';

export const useActivateAccountController = (
    authService = useAPIAuthService(),
): /* <--Dependency Injections  like services hooks */
ActivateAccountController => {
    const [tokenQuery, setTokenQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isValidated, setIsValidated] = useState(false);

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
