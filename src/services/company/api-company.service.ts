import { CompanyDto, CompanyService } from 'services/company/company.service';
import { Session } from 'auth/models/session';

export class ApiCompanyService implements CompanyService {
    constructor(private session: Session) {}

    createCompany(input: CompanyDto): Promise<CompanyDto> {
        return Promise.resolve({ name: '' });
    }

    getCompany(): Promise<CompanyDto> {
        return Promise.resolve({ name: '' });
    }
}
