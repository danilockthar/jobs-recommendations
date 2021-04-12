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
    const [queryInvite, setQueryInvite] = useState('');
    const history = useHistory();
    const location = useLocation();
    const { from } = (location.state as { from: any }) || { from: { pathname: '/' } };

    /* Listeners */
    // Ex. useEffect(() => { onSessionUpdate(); }, [session]);

    /* View Events */
    const setQueryURL = (query: string) => {
        setQueryInvite(query);
    };
    const onRegisterSubmit = (formInputs: unknown) => {
        setIsLoading(true);
        const input = plainToClass(RegisterInput, formInputs);
        const roleInput = parseRoleInput(formInputs);
        if (roleInput) {
            input.roles = [roleInput];
        }
        if (queryInvite.length > 5) {
            input.invitationCode = queryInvite;
        }
        authService
            .register(input)
            .then(() => {
                history.replace(from);
            })
            .catch((errorCode) => {
                switch (errorCode) {
                    case 'existing_user':
                        messenger.showErrorMessage({ key: 'auth.register-error-existing-user' });
                        break;

                    case 'company_reached_trial_limits':
                    case 'company_reached_limit_editors':
                        messenger.showErrorMessage({ key: 'La organización alcanzó el límite de editores' });
                        break;
                    case 'company_overcame_limit_editors':
                        messenger.showErrorMessage({ key: 'La organización supero el límite de editores' });
                        break;

                    case 'company_cant_be_editor':
                        messenger.showErrorMessage({ key: 'Una organización no puede ser editor.' });
                        break;

                    case 'one_company_per_editor':
                        messenger.showErrorMessage({ key: 'Un editor no puede pertenecer a dos organizaciónes.' });
                        break;

                    case 'current_editor':
                        messenger.showErrorMessage({ key: 'Actualmente ya eres editor de esta organización' });
                        break;

                    default:
                        messenger.showErrorMessage({ key: 'auth.register-error' });
                        break;
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
    return { isLoading, onRegisterSubmit, setQueryURL };
};
