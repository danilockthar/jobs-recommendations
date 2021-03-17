export interface JobOfferViewModel {
    id: string;
    jobTitle: string;
    company: string;
    createdAt: string;
    author: string;
    logo: string;
    relevanceIndex: number;
    status: boolean;
    type: string;
    description: string;
    descriptionHTML: string;
}

export interface CompanyOffersController {
    /* State */
    jobsViewModels: JobOfferViewModel[];
    errorExist: boolean;
    errorMessage: string;
    /* Events */
    activeKey: string;
    setNewCollapseKey: (key: string) => void;
    isLoaderVisible: boolean;
}

export interface CompanyOffersFragmentProps {
    useController?: () => CompanyOffersController;
}
