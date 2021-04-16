export interface OnBoardingController {
    /* State */
    /* Events */
    isLoading: boolean;
    onOnboardingSubmit: (formInputs: unknown) => void;
}

export interface OnBoardingFragmentProps {
    useController?: () => OnBoardingController;
}
