export interface RelevanceCardController {
    /* State */
    userName?: string;
    currentCompanyName?: string;
    fieldOfStudy?: string;
    skillsLabel?: string;
    isProfileComplete: boolean;
    isConnected: boolean;
    /* Events */
    connect: () => void;
    disconnect: () => void;
}

export interface RelevanceCardFragmentProps {
    useController?: () => RelevanceCardController;
}
