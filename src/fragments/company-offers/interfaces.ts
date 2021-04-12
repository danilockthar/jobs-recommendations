export interface JobOfferViewModel {
    id: string;
    jobTitle: string;
    company: string;
    createdAt: string;
    author: string;
    logo: string;
    relevanceIndex: number;
    status: string;
    type: string;
    description: string;
    descriptionHTML: string;
}

export interface CompanyOffersController {
    /* State */
    jobsViewModels: JobOfferViewModel[];
    changeJobStatus: (action: string) => void;
    checkedID: string[];
    company: any;
    errorExist: boolean;
    action: string;
    errorMessage: string;
    filter: string;
    /* Events */
    activeKey: string;
    setNewCollapseKey: (key: string) => void;
    handleSelect: (value: any) => void;
    handleCheckbox: (e: any) => void;
    isLoaderVisible: boolean;
}

export interface CompanyOffersFragmentProps {
    useController?: () => CompanyOffersController;
}
