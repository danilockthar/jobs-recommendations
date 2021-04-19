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
export enum Action {
    PUBLISH = 'PUBLISH',
    HIDE = 'HIDE',
}
export enum Filter {
    PUBLISHED = 'PUBLISHED',
    HIDDEN = 'HIDDEN',
    ALL = 'ALL',
}
export interface CompanyOffersController {
    /* State */
    jobsViewModels: JobOfferViewModel[];
    changeJobStatus: (action: string) => void;
    handleFilter: (value: Filter) => void;
    checkedID: string[];
    company: any;
    errorExist: boolean;
    action: string;
    errorMessage: string;
    filter: Filter;
    /* Events */
    activeKey: string;
    onItemCollapseChange: (keyId: any) => void;
    handleSelect: (value: any) => void;
    handleCheckbox: (e: any) => void;
    isLoaderVisible: boolean;
}

export interface CompanyOffersFragmentProps {
    useController?: () => CompanyOffersController;
}
