export interface TeamFragmentController {
    /* State */
    /* Events */
    isLoaderVisible: boolean;
    company: any;
}

export interface TeamFragmentFragmentProps {
    useController?: () => TeamFragmentController;
}
