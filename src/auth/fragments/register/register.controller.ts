import { RegisterInput, Role, useAPIAuthService } from 'auth/services/auth/auth.service';
import { plainToClass } from 'class-transformer';
import { RegisterController } from 'auth/fragments/register/interfaces';
import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useMessenger } from 'tools/view-hooks/messenger-hook';
import { useTranslator } from 'tools/view-hooks/translator-hook';

export const useRegisterController = (
    authService = useAPIAuthService(),
    messenger = useMessenger(),
): RegisterController => {
    /* State */
    const [isLoading, setIsLoading] = useState(false);
    const [queryInvite, setQueryInvite] = useState<string | undefined>(undefined);
    const [subtitle, setSubtitle] = useState('');
    const [typeQuery, setTypeQuery] = useState<Role>(Role.Person);
    const [hasToConfirmEmail, setHasToConfirmEmail] = useState(false);
    const history = useHistory();
    const location = useLocation();
    const { translate } = useTranslator();
    const { from } = (location.state as { from: any }) || { from: { pathname: '/' } };

    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }
    const query = useQuery();

    useEffect(() => {
        if (query.get('invitationCode') || query.get('type')) {
            setQueryInvite(query.get('invitationCode') ?? '');
            setQueryURL(query.get('type') ?? '');
        }
    }, [query.get('invitationCode'), query.get('type')]);

    const setQueryURL = (query: string) => {
        switch (query) {
            case 'organization':
                setTypeQuery(Role.Company);
                setSubtitle(translate({ key: 'auth.im-organization' }));
                break;
            case 'colaborator':
                setTypeQuery(Role.Editor);
                setSubtitle(translate({ key: 'auth.im-colaborator' }));
                break;
            case 'individual':
                setTypeQuery(Role.Person);
                setSubtitle(translate({ key: 'auth.im-individual' }));
                break;
            default:
                // nothing to do here
                break;
        }
    };
    const onRegisterSubmit = (formInputs: unknown) => {
        setIsLoading(true);
        const input = plainToClass(RegisterInput, formInputs);
        input.roles = [typeQuery];
        if (queryInvite) {
            input.invitationCode = queryInvite;
        }
        authService
            .register(input)
            .then(() => {
                setHasToConfirmEmail(true);
            })
            .catch((errorCode) => {
                switch (errorCode) {
                    case 'existing_user':
                        messenger.showErrorMessage({ key: 'auth.register-error-existing-user' });
                        break;
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
                        messenger.showErrorMessage({ key: 'Un editor no puede pertenecer a dos organizaciones.' });
                        break;

                    case 'current_editor':
                        messenger.showErrorMessage({ key: 'Actualmente ya eres editor de esta organización' });
                        break;

                    case 'subscription_canceled':
                        messenger.showErrorMessage({ key: 'La organización canceló la membresía.' });
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
    return { isLoading, onRegisterSubmit, setQueryURL, hasToConfirmEmail, subtitle };
};
