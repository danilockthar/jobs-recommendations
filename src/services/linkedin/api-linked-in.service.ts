import axios from 'axios';
import { Session } from 'auth/models/session';
import { LinkedInService } from 'services/linkedin/linked-in.service';
import { LinkedInPersonDataDto } from 'services/linkedin/dtos/linked-in-person-data.dto';
import { plainToClass } from 'class-transformer';

export class ApiLinkedInService implements LinkedInService {
    constructor(private session: Session) {}

    async findLinkedInPerson(): Promise<LinkedInPersonDataDto> {
        const response = await axios.get(process.env.REACT_APP_API_BASE_URL + '/linked-in/find-person', {
            headers: { Authorization: 'Bearer ' + this.session.getToken() },
        });
        return plainToClass(LinkedInPersonDataDto, response.data);
    }

    async connectLinkedInPerson(): Promise<LinkedInPersonDataDto> {
        const response = await axios.post(
            process.env.REACT_APP_API_BASE_URL + '/linked-in/connect-person',
            { vanityName: 'francofadini' },
            {
                headers: { Authorization: 'Bearer ' + this.session.getToken() },
            },
        );
        return plainToClass(LinkedInPersonDataDto, response.data);
    }

    async disconnectLinkedInPerson(): Promise<LinkedInPersonDataDto> {
        const response = await axios.get(process.env.REACT_APP_API_BASE_URL + '/linked-in/disconnect-person', {
            headers: { Authorization: 'Bearer ' + this.session.getToken() },
        });
        return plainToClass(LinkedInPersonDataDto, response.data);
    }
}
