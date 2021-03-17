import { useLocalSession } from 'auth/helpers/session.hooks';
import { ApiCompanyService } from 'services/company/api-company.service';

export interface CompanyDto {
    name: string;
}

export interface CompanyService {
    getCompany(): Promise<CompanyDto>;
    createCompany(input: CompanyDto): Promise<CompanyDto>;
}

export const useAPICompanyService = (): CompanyService => {
    const [getSession] = useLocalSession();
    const session = getSession();
    return new ApiCompanyService(session);
};
