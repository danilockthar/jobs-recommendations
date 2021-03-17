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
    const [activeKey, setActiveKey] = useState('');
    const [isLoaderVisible, setIsLoaderVisible] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [errorExist, setErrorExist] = useState(true);

    const { jobs } = useContext(LinkedInJobsContext);

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const viewModels = jobs.map(mapDtoToViewModel);
        setJobsViewModels(viewModels);
    }, [jobs]);

    const setNewCollapseKey = (key: string) => {
        setActiveKey(key);
    };

    const fetchData = () => {
        setIsLoaderVisible(true);
        linkedInService
            .findLinkedInJobs()
            .then((output) => {
                if (output.length == 0) {
                    setErrorExist(true);
                    setErrorMessage('Aún no hay trabajos.');
                    // setActiveKey(output[0].jobId);
                } else {
                    setErrorExist(false);
                    setErrorMessage('');
                    const viewModels = output.map(mapDtoToViewModel);
                    setJobsViewModels(viewModels);
                }
            })
            .catch((e) => {
                setErrorExist(true);
                setErrorMessage('Ocurió un problema al buscar los trabajos.');
                messenger.showErrorMessage({ key: 'Ocurió un problema al buscar los trabajos.' });
            })
            .finally(() => {
                setIsLoaderVisible(false);
            });
    };

    /* Private Methods */
    const mapDtoToViewModel = (dto: LinkedInJobDto): JobOfferViewModel => {
        console.log(dto);
        return {
            author: dto.company ?? '',
            company: dto.company ?? '',
            createdAt: dto.date ?? '',
            description: dto.description ?? '',
            descriptionHTML: dto.descriptionHTML ?? '',
            id: dto.jobId ?? '',
            jobTitle: dto.title ?? '',
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
        errorMessage,
        errorExist,
        setNewCollapseKey,
    };
};
