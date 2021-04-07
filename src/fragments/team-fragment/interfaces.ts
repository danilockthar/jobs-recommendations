interface EditorModal {
    id: number;
    email: string;
}

export interface TeamFragmentController {
    /* State */
    /* Events */
    editor: EditorModal;
    isLoaderVisible: boolean;
    isLoading: boolean;
    company: any;
    dataSource: any;
    deleteEditor: (id: number, email: string) => void;
    confirmEditor: (id: number, email: string) => void;
    closeDeleteModal: () => void;
    toggleModal: () => void;
    isModalOpen: boolean;
    isModalLoading: boolean;
    isModalDeleteOpen: boolean;
}

export interface TeamFragmentFragmentProps {
    useController?: () => TeamFragmentController;
}
