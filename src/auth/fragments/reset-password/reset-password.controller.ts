import { ResetPasswordInput, useAPIAuthService } from 'auth/services/auth/auth.service';
import { plainToClass } from 'class-transformer';
import { useState } from 'react';
import { ResetPasswordController } from 'auth/fragments/reset-password/interfaces';
import { useParams, useHistory } from 'react-router-dom';
import { useMessenger } from 'tools/view-hooks/messenger-hook';
export const useResetPasswordController = (
    authService = useAPIAuthService(),
    messenger = useMessenger(),
): ResetPasswordController => {
    /* State */
    const [isLoading, setIsLoading] = useState(false);
    const { token }: { token: string } = useParams();
    const history = useHistory();

    /* Listeners */
    // Ex. useEffect(() => { onSessionUpdate(); }, [session]);

    /* View Events */
    const onResetPasswordSubmit = (formInputs: unknown) => {
        setIsLoading(true);
        const input = plainToClass(ResetPasswordInput, formInputs);
        if (input.password != input.repeatPassword) {
            messenger.showErrorMessage({ key: 'auth.reset-pass-error-not-match' });
            return;
        }
        authService
            .resetPassword(token, input)
            .then(() => {
                messenger.showSuccessMessage({ key: 'auth.reset-pass-success' });
                history.push('/login');
            })
            .catch(() => {
                messenger.showErrorMessage({ key: 'auth.reset-pass-error' });
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    // Return state and events
    return { isLoading, onResetPasswordSubmit };
};
