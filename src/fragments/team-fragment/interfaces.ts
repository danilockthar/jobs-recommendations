export interface TeamFragmentController {
    /* State */
    /* Events */
    isLoaderVisible: boolean;
    isLoading: boolean;
    company: any;
    dataSource: any;
    deleteEditor: (id: number) => void;
    toggleModal: () => void;
    isModalOpen: boolean;
}

export interface TeamFragmentFragmentProps {
    useController?: () => TeamFragmentController;
}
