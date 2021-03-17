import { CompanyDto, CompanyService } from 'services/company/company.service';
import { Session } from 'auth/models/session';
import axios from 'axios';
import { plainToClass } from 'class-transformer';

export class ApiCompanyService implements CompanyService {
    constructor(private session: Session) {}

    async createCompany(input: CompanyDto): Promise<CompanyDto> {
        const response = await axios.post(process.env.REACT_APP_API_BASE_URL + '/company', input, {
            headers: { Authorization: 'Bearer ' + this.session.getToken() },
        });

        return response.data;
    }

    async getCompany(): Promise<CompanyDto> {
        const response = await axios.get(process.env.REACT_APP_API_BASE_URL + '/company', {
            headers: { Authorization: 'Bearer ' + this.session.getToken() },
        });

        // return plainToClass(CompanyDto, response.data);

        return response.data;
    }
}
