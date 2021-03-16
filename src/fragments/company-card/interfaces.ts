interface UserProfile {
    id?: string;
    name?: string;
    company?: string;
    profilePicture?: string;
    industry?: string;
    experience?: string;
    email?: string;
    succeed?: boolean;
}
interface CompanyProfile {
    id?: number;
    logoUrl?: string;
    membershipType?: string;
    name?: string;
    websiteUrl?: string;
}

export interface CompanyCardController {
    desvinculateLinkedin: () => void;
    connectToLinkedinAsCompany: () => void;
    /* Events */
    isLoaderVisible: boolean;
    company: CompanyProfile;
    error: string;
}

export interface CompanyCardFragmentProps {
    useController?: () => CompanyCardController;
}
