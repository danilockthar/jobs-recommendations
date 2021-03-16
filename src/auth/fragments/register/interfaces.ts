export interface RegisterController {
    /* State */
    isLoading: boolean;
    /* Events */
    onRegisterSubmit: (formInputs: unknown) => void;
}

export interface RegisterFragmentProps {
    useController?: () => RegisterController;
}
