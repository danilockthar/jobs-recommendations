import axios from 'axios';
import { Session } from 'auth/models/session';
import {
    ConnectLinkedInPersonInput,
    ImportLinkedInJobsInput,
    LinkedInService,
} from 'services/linkedin/linked-in.service';
import { LinkedInPersonDataDto } from 'services/linkedin/dtos/linked-in-person-data.dto';
import { plainToClass } from 'class-transformer';
import { LinkedInJobDto } from 'services/linkedin/dtos/linked-in-job.dto';

export class ApiLinkedInService implements LinkedInService {
    constructor(private session: Session) {}

    async getLinkedInPerson(): Promise<LinkedInPersonDataDto> {
        const response = await axios.get(process.env.REACT_APP_API_BASE_URL + '/linked-in/find-person', {
            headers: { Authorization: 'Bearer ' + this.session.getToken() },
        });
        return plainToClass(LinkedInPersonDataDto, response.data);
    }

    async connectLinkedInPerson(input: ConnectLinkedInPersonInput): Promise<LinkedInPersonDataDto> {
        const response = await axios.post(process.env.REACT_APP_API_BASE_URL + '/linked-in/connect-person', input, {
            headers: { Authorization: 'Bearer ' + this.session.getToken() },
        });
        return plainToClass(LinkedInPersonDataDto, response.data);
    }

    async disconnectLinkedInPerson(): Promise<LinkedInPersonDataDto> {
        const response = await axios.get(process.env.REACT_APP_API_BASE_URL + '/linked-in/disconnect-person', {
            headers: { Authorization: 'Bearer ' + this.session.getToken() },
        });
        return plainToClass(LinkedInPersonDataDto, response.data);
    }

    async importLinkedInJobs(input: ImportLinkedInJobsInput): Promise<LinkedInJobDto[]> {
        const response = await axios.post(process.env.REACT_APP_API_BASE_URL + `/linked-in/import-jobs`, input, {
            headers: { Authorization: 'Bearer ' + this.session.getToken() },
        });
        return response.data.map((data: unknown) => {
            return plainToClass(LinkedInJobDto, data);
        });
    }
    async editJobsStatus(linkedInJobsIds: string[], action: string): Promise<any> {
        console.log(linkedInJobsIds);
        const response = await axios.put(
            process.env.REACT_APP_API_BASE_URL + `/linked-in/jobs`,
            { linkedInJobsIds, action },
            {
                headers: { Authorization: 'Bearer ' + this.session.getToken() },
            },
        );

        // return plainToClass(CompanyDto, response.data);

        return response.data;
    }
    async findLinkedInJobs(): Promise<LinkedInJobDto[]> {
        const response = await axios.get(process.env.REACT_APP_API_BASE_URL + `/linked-in/jobs`, {
            headers: { Authorization: 'Bearer ' + this.session.getToken() },
        });
        return response.data;
        return response.data.map((data: unknown) => {
            return plainToClass(LinkedInJobDto, data);
        });
    }

    async getOneJobByID(id: number): Promise<LinkedInJobDto> {
        const response = await axios.get(process.env.REACT_APP_API_BASE_URL + `/linked-in/one-job/${id}`, {
            headers: { Authorization: 'Bearer ' + this.session.getToken() },
        });
        return plainToClass(LinkedInJobDto, response.data);
    }
}
