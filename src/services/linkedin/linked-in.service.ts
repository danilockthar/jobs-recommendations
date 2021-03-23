import { useLocalSession } from 'auth/helpers/session.hooks';
import { LinkedInPersonDataDto } from 'services/linkedin/dtos/linked-in-person-data.dto';
import { ApiLinkedInService } from 'services/linkedin/api-linked-in.service';
import { LinkedInJobDto } from 'services/linkedin/dtos/linked-in-job.dto';

export class ConnectLinkedInPersonInput {
    linkedinURL?: string;
}

export class ImportLinkedInJobsInput {
    jobsUrl?: string;
    companyName?: string;
}

export interface LinkedInService {
    getLinkedInPerson(): Promise<LinkedInPersonDataDto>;
    connectLinkedInPerson(input: ConnectLinkedInPersonInput): Promise<LinkedInPersonDataDto>;
    disconnectLinkedInPerson(): Promise<LinkedInPersonDataDto>;
    importLinkedInJobs(input: ImportLinkedInJobsInput): Promise<LinkedInJobDto[]>;
    findLinkedInJobs(): Promise<LinkedInJobDto[]>;
    getOneJobByID(id: number): Promise<LinkedInJobDto>;
}

export const useAPILinkedInService = (): LinkedInService => {
    const [getSession] = useLocalSession();
    const session = getSession();
    return new ApiLinkedInService(session);
};
