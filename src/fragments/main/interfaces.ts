export interface MainViewController {
    example?: string;
}

export interface MainFragmentProps {
    useController?: () => MainViewController;
}
