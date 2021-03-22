import { useState, useEffect } from 'react';
import { RecommendedJobsFragmentController } from 'fragments/recommended-jobs-fragment/interfaces';
import { useApiOffersListService } from 'services/offers-list/offers-list.service';
import { useAPILinkedInService } from 'services/linkedin/linked-in.service';
import { LinkedInJobDto } from 'services/linkedin/dtos/linked-in-job.dto';
import { JobOfferViewModel } from 'fragments/offers-list/interfaces';
import { useApiReferralService } from 'services/referrals/referrals.service';
import { stringify } from 'node:querystring';

export const useRecommendedJobsFragmentController = (
    offerService = useApiOffersListService(),
    referralService = useApiReferralService(),
    linkedInService = useAPILinkedInService(),
): /* <--Dependency Injections  like services hooks */
RecommendedJobsFragmentController => {
    const [jobs, setJobs] = useState<JobOfferViewModel[]>([]);
    const [isLoaderVisible, setIsLoaderVisible] = useState(false);
    const [activeKey, setActiveKey] = useState('');
    const [error, setError] = useState({ exist: false, message: '' });

    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        setIsLoaderVisible(true);
        referralService
            .getReferralJobs()
            .then((output) => {
                if (output.length > 0) {
                    console.log(output, 'outpur');
                    // setActiveKey(output[0].jobId);
                    setJobs(output.map(mapDtoToViewModel));
                } else {
                    setError({ exist: true, message: 'Aún no hay ofertas de trabajo disponibles.' });
                }
            })
            .catch(() => {
                setError({ exist: true, message: 'Something went wrong' });
            })
            .finally(() => {
                setIsLoaderVisible(false);
            });
    };

    const mapDtoToViewModel = (dto: LinkedInJobDto): JobOfferViewModel => {
        return {
            author: dto.company ?? '',
            company: dto.company ?? '',
            createdAt: dto.date ?? '',
            description: dto.description ?? '',
            descriptionHTML: dto.descriptionHTML ?? '',
            id: dto.jobId ?? '',
            jobTitle: dto.title ?? '',
            link: dto.link ?? '',
            logo: '',
            relevanceIndex: 0,
            status: false,
            type: '',
        };
    };
    const setNewCollapseKey = (key: string) => {
        setActiveKey(key);
    };

    const onButtonPressed = () => {
        // Example event
    };

    return { jobs, onButtonPressed, activeKey, setNewCollapseKey };
};
