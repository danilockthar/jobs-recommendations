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
}

interface Error {
    exist: boolean;
    message: string;
}

export interface OffersListController {
    /* State */
    jobs: any[];
    /* Events */
    activeKey: string;
    setNewCollapseKey: (key: string) => void;
    openModal: (key: any) => void;
    onCancel: () => void;
    onFinish: () => void;
    error: Error;
    formRef: any;
    uniqueJob: any;
    isLoaderVisible: boolean;
    isVisible: boolean;
    isLoading: boolean;
    modalView: string;
    referred: string;
}

export interface OffersListFragmentProps {
    useController?: () => OffersListController;
}
