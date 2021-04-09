import { useLocalSession } from 'auth/helpers/session.hooks';
import { AxiosResponse } from 'axios';
import { ApiCompanyService } from 'services/company/api-company.service';

export class CompanyDto {
    name?: string;
    id?: number;
    subscriptions?: any;
}

export interface CompanyService {
    getCompany(): Promise<CompanyDto>;
    createCompany(input: CompanyDto): Promise<CompanyDto>;
    deleteCompanyEditor(id: number): Promise<any>;
    sendInvitationEditor(email: string): Promise<AxiosResponse<any>>;
}

export const useAPICompanyService = (): CompanyService => {
    const [getSession] = useLocalSession();
    const session = getSession();
    return new ApiCompanyService(session);
};
