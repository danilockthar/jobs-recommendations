export interface RegisterController {
    /* State */
    isLoading: boolean;
    hasToConfirmEmail: boolean;
    subtitle: string;
    setQueryURL: (query: string) => void;
    /* Events */
    onRegisterSubmit: (formInputs: unknown) => void;
}

export interface RegisterFragmentProps {
    useController?: () => RegisterController;
}
