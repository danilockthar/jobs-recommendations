import { useEffect, useState } from 'react';
import { CompanyCardController } from 'fragments/company-card/interfaces';
import { useApiRelevanceCardService } from 'services/relevance-card/relevance-card.service';
import { useApiDisconnectLinkedin } from 'services/linkedin/disconnect/disconect.service';
import { useLocalSession } from 'auth/helpers/session.hooks';

interface UserProfile {
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

export const useCompanyCardController = (
    relevanceService = useApiRelevanceCardService(),
    disconnectService = useApiDisconnectLinkedin(),
): /* <--Dependency Injections  like services hooks */
CompanyCardController => {
    const [error, setError] = useState('');
    const [isLoaderVisible, setIsLoaderVisible] = useState(true);
    const [company, setCompany] = useState<CompanyProfile>({});
    const [getSession] = useLocalSession();
    const session = getSession();

    useEffect(() => {
        fetchData().finally();
    }, []);

    const connectToLinkedinAsCompany = async () => {
        try {
            await relevanceService.getCompanyData();
        } catch (error) {
            setError('Algo salió mal.');
        }
    };

    const desvinculateLinkedin = async () => {
        try {
            await disconnectService.linkedinDisconnect('as23', 'company');
        } catch (error) {
            setError('Something went wrong');
        }
    };

    const fetchData = async () => {
        setIsLoaderVisible(true);

        const profileCompany = await relevanceService.getCompanyData();
        if (profileCompany.id) {
            setCompany({
                id: profileCompany.id,
                name: profileCompany.name,
                logoUrl: profileCompany.logoUrl,
                websiteUrl: profileCompany.websiteUrl,
                membershipType: profileCompany.membershipType,
            });
        }

        setIsLoaderVisible(false);
    };

    return { isLoaderVisible, error, desvinculateLinkedin, connectToLinkedinAsCompany, company };
};
