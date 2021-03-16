import { FormInstance } from 'antd';

export interface LoginController {
    /* State */
    recoverPassForm: FormInstance;
    isLoading: boolean;
    isRecoverPassLoading: boolean;
    isRecoverPassVisible: boolean;
    /* Events */
    onLoginSubmit: (formInputs: unknown) => void;
    onRecoverPassSubmit: (formInputs: unknown) => void;
    onCancelRecoverPass: () => void;
    onForgotPassPressed: () => void;
}

export interface LoginFragmentProps {
    useController?: () => LoginController;
}
