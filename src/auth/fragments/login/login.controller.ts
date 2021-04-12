import { LoginController } from 'auth/fragments/login/interfaces';
import { LoginInput, SendResetPasswordMailInput, useAPIAuthService } from 'auth/services/auth/auth.service';
import { plainToClass } from 'class-transformer';
import { useState } from 'react';
import { Form } from 'antd';
import { useMessenger } from 'tools/view-hooks/messenger-hook';
import { useLocation, useHistory } from 'react-router-dom';

export const useLoginController = (authService = useAPIAuthService(), messenger = useMessenger()): LoginController => {
    /* State */
    // Ex. const [count, setCount] = useState(0);

    /* Listeners */
    const [isLoading, setIsLoading] = useState(false);
    const [isRecoverPassLoading, setIsRecoverPassLoading] = useState(false);
    const [isRecoverPassVisible, setIsRecoverPassVisible] = useState(false);
    const [recoverPassForm] = Form.useForm();
    const history = useHistory();
    const location = useLocation();
    const { from } = (location.state as { from: any }) || { from: { pathname: '/' } };

    /* View Events */
    const onLoginSubmit = (formInputs: unknown) => {
        setIsLoading(true);
        const input = plainToClass(LoginInput, formInputs);
        //Auth route component will handle re-render
        authService
            .login(input)
            .then(() => {
                history.replace(from);
            })
            .catch((errorCode) => {
                switch (errorCode) {
                    case 'company_overcame_trial_limits':
                    case 'company_overcame_limit_editors':
                        messenger.showErrorMessage({ key: 'La compañia superó el límite de editores.' });
                        break;

                    case 'invalid_credentials':
                        messenger.showErrorMessage({ key: 'auth.login-error-invalid-credentials' });
                        break;

                    case 'subscription_canceled':
                        messenger.showErrorMessage({ key: 'Tu compañia cancelo la membresia.' });
                        break;

                    default:
                        messenger.showErrorMessage({ key: 'auth.login-error' });
                        break;
                }
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const onRecoverPassSubmit = (formInputs: unknown) => {
        setIsRecoverPassLoading(true);
        const input = plainToClass(SendResetPasswordMailInput, formInputs);
        authService
            .sendResetPasswordMail(input)
            .then(() => {
                recoverPassForm.resetFields();
                messenger.showSuccessMessage({ key: 'auth.forgot-pass-success' });
            })
            .catch(() => {
                messenger.showErrorMessage({ key: 'auth.forgot-pass-error' });
            })
            .finally(() => {
                recoverPassForm.resetFields();
                setIsRecoverPassVisible(false);
                setIsRecoverPassLoading(false);
            });
    };

    const onCancelRecoverPass = () => {
        recoverPassForm.resetFields();
        setIsRecoverPassVisible(false);
    };

    const onForgotPassPressed = () => {
        setIsRecoverPassVisible(true);
    };

    /* Private Methods */

    // Return state and events
    return {
        recoverPassForm,
        isLoading,
        isRecoverPassLoading,
        isRecoverPassVisible,
        onLoginSubmit,
        onRecoverPassSubmit,
        onCancelRecoverPass,
        onForgotPassPressed,
    };
};
