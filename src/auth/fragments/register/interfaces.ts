export interface RegisterController {
    /* State */
    isLoading: boolean;
    setQueryURL: (query: string) => void;
    /* Events */
    onRegisterSubmit: (formInputs: unknown) => void;
}

export interface RegisterFragmentProps {
    useController?: () => RegisterController;
}
