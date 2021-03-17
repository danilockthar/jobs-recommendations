import { FormInstance } from 'antd';

export interface CompanyCardController {
    /* State */
    companyName: string;
    isLoaderVisible: boolean;
    importJobsForm: FormInstance;
    isImportFormVisible: boolean;
    isImportFormLoading: boolean;
    /* Events */
    onImportJobsPressed: () => void;
    onImportJobsSubmitted: (inputs: unknown) => void;
}

export interface CompanyCardFragmentProps {
    useController?: () => CompanyCardController;
}
