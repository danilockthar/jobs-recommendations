export interface ResetPasswordController {
    /* State */
    isLoading: boolean;
    /* Events */
    onResetPasswordSubmit: (formInputs: unknown) => void;
}

export interface ResetPasswordFragmentProps {
    useController?: () => ResetPasswordController;
}
