import { LinkedInJobDto } from 'services/linkedin/dtos/linked-in-job.dto';
import React from 'react';

export interface LinkedInJobsContextInterface {
    jobs: LinkedInJobDto[];
    setJobs: (jobs: LinkedInJobDto[]) => void;
}
export const LinkedInJobsContext = React.createContext<LinkedInJobsContextInterface>({
    jobs: [],
    setJobs: (jobs: LinkedInJobDto[]) => {
        // Nothing to do
    },
});
