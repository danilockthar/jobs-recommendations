export interface ActivateAccountController {
    /* State */
    setQueryURL: (query: string) => void;
    confirmEmail: (token: string) => void;
    isLoading: boolean;
    isValidated: boolean;
}

export interface ActivateAccountFragmentProps {
    useController?: () => ActivateAccountController;
}
