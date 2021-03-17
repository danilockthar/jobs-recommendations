export interface JobOfferViewModel {
    id: number;
    jobTitle: string;
    company: string;
    createdAt: string;
    author: string;
    logo: string;
    relevanceIndex: number;
    status: boolean;
    type: string;
    description: string;
}

export interface CompanyOffersController {
    /* State */
    jobsViewModels: JobOfferViewModel[];
    /* Events */
    activeKey: number;
    setNewCollapseKey: (key: number) => void;
    isLoaderVisible: boolean;
}

export interface CompanyOffersFragmentProps {
    useController?: () => CompanyOffersController;
}
