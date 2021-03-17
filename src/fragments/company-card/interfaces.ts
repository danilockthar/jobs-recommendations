import { FormInstance } from 'antd';

export interface CompanyCardController {
    /* State */
    companyName: string;
    isLoaderVisible: boolean;
    importJobsForm: FormInstance;
    isImportFormVisible: boolean;
    isImportFormLoading: boolean;
    modalNameCompany: boolean;
    /* Events */
    onImportJobsPressed: () => void;
    onImportJobsSubmitted: (inputs: unknown) => void;
    onNameCompanyAdded: (input: unknown) => void;
    onImportFormCancel: () => void;
}

export interface CompanyCardFragmentProps {
    useController?: () => CompanyCardController;
}
