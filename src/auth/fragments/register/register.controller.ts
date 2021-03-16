import { RegisterInput, Role, useAPIAuthService } from 'auth/services/auth/auth.service';
import { plainToClass } from 'class-transformer';
import { RegisterController } from 'auth/fragments/register/interfaces';
import { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useMessenger } from 'tools/view-hooks/messenger-hook';

export const useRegisterController = (
    authService = useAPIAuthService(),
    messenger = useMessenger(),
): RegisterController => {
    /* State */
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();
    const location = useLocation();
    const { from } = (location.state as { from: any }) || { from: { pathname: '/' } };

    /* Listeners */
    // Ex. useEffect(() => { onSessionUpdate(); }, [session]);

    /* View Events */
    const onRegisterSubmit = (formInputs: unknown) => {
        setIsLoading(true);
        const input = plainToClass(RegisterInput, formInputs);
        const roleInput = parseRoleInput(formInputs);
        if (roleInput) {
            input.roles = [roleInput];
        }
        authService
            .register(input)
            .then(() => {
                history.replace(from);
            })
            .catch((errorCode) => {
                if (errorCode == 'existing_user') {
                    messenger.showErrorMessage({ key: 'auth.register-error-existing-user' });
                } else {
                    messenger.showErrorMessage({ key: 'auth.register-error' });
                }
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    /* Private Methods */
    const parseRoleInput = (formInputs: unknown): Role | undefined => {
        try {
            const typedInputs = formInputs as { role: string };
            return typedInputs.role as Role;
        } catch (e) {
            console.log('Error parsing role input');
        }
    };

    // Return state and events
    return { isLoading, onRegisterSubmit };
};
