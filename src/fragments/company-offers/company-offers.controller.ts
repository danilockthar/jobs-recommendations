import { useState, useEffect, useContext } from 'react';
import { CompanyOffersController } from 'fragments/company-offers/interfaces';
import { JobOfferViewModel } from 'fragments/company-offers/interfaces';
import { useMessenger } from 'tools/view-hooks/messenger-hook';
import { useAPILinkedInService } from 'services/linkedin/linked-in.service';
import { LinkedInJobDto } from 'services/linkedin/dtos/linked-in-job.dto';
import { LinkedInJobsContext } from 'services/linkedin/linked-in-jobs.context';

export const useCompanyOffersController = (
    messenger = useMessenger(),
    linkedInService = useAPILinkedInService(),
): CompanyOffersController => {
    const [jobsViewModels, setJobsViewModels] = useState<JobOfferViewModel[]>([]);
    const [activeKey, setActiveKey] = useState(1);
    const [isLoaderVisible, setIsLoaderVisible] = useState(true);
    const { jobs } = useContext(LinkedInJobsContext);

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const viewModels = jobs.map(mapDtoToViewModel);
        setJobsViewModels(viewModels);
    }, [jobs]);

    const setNewCollapseKey = (key: number) => {
        setActiveKey(key);
    };

    const fetchData = () => {
        setIsLoaderVisible(true);
        linkedInService
            .getLinkedInJobs()
            .then((output) => {
                if (output.length > 0) {
                    setActiveKey(output[0].id);
                }
                const viewModels = output.map(mapDtoToViewModel);
                setJobsViewModels(viewModels);
            })
            .catch(() => {
                messenger.showErrorMessage({ key: 'Ocurió un problema al buscar los trabajos.' });
            })
            .finally(() => {
                setIsLoaderVisible(false);
            });
    };

    /* Private Methods */
    const mapDtoToViewModel = (dto: LinkedInJobDto): JobOfferViewModel => {
        return {
            author: '',
            company: '',
            createdAt: '',
            description: '',
            id: dto.id,
            jobTitle: dto.title,
            logo: '',
            relevanceIndex: 0,
            status: false,
            type: '',
        };
    };

    return {
        jobsViewModels,
        isLoaderVisible,
        activeKey,
        setNewCollapseKey,
    };
};
