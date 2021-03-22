export interface JobOfferViewModel {
    id: string;
    jobTitle: string;
    company: string;
    createdAt: string;
    author: string;
    logo: string;
    link: string;
    relevanceIndex: number;
    status: boolean;
    type: string;
    description: string;
    descriptionHTML: string;
}
interface Error {
    exist: boolean;
    message: string;
}

export interface RecommendedJobsFragmentController {
    /* State */
    jobs: any[];
    activeKey: string;
    setNewCollapseKey: (key: string) => void;
    /* Events */
    onButtonPressed: () => void;
}

export interface RecommendedJobsFragmentFragmentProps {
    useController?: () => RecommendedJobsFragmentController;
}
