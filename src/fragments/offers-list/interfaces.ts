export interface JobOfferViewModel {
    id: number;
    job_title: string;
    company: string;
    created_at: string;
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
    activeKey: number;
    setNewCollapseKey: (key: number) => void;
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
