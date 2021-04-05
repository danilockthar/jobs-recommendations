export interface TeamFragmentController {
    /* State */
    example: string;
    /* Events */
    onButtonPressed: () => void;
}

export interface TeamFragmentFragmentProps {
    useController?: () => TeamFragmentController;
}
