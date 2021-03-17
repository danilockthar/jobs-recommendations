import { FormInstance } from 'antd';

export interface RelevanceCardController {
    /* State */
    userName?: string;
    currentCompanyName?: string;
    fieldOfStudy?: string;
    skillsLabel?: string;
    isProfileComplete: boolean;
    isConnected: boolean;
    connectForm: FormInstance;
    isConnectFormVisible: boolean;
    isConnectFormLoading: boolean;
    /* Events */
    disconnect: () => void;
    onConnectButtonPressed: () => void;
    onConnectFormSubmit: (inputs: unknown) => void;
    onConnectFormCancel: () => void;
}

export interface RelevanceCardFragmentProps {
    useController?: () => RelevanceCardController;
}
