import { useState, useEffect } from 'react';
import { OffersListController, JobOfferViewModel } from 'fragments/offers-list/interfaces';
import { useApiOffersListService } from 'services/offers-list/offers-list.service';
import { useApiReferralService } from 'services/referrals/referrals.service';
import { Form } from 'antd';

export const useOffersListController = (
    offerService = useApiOffersListService(),
    referralsService = useApiReferralService(),
): /* <--Dependency Injections  like services hooks */ OffersListController => {
    const [jobs, setJobs] = useState<JobOfferViewModel[]>([]);
    const [error, setError] = useState({ exist: false, message: '' });
    const [activeKey, setActiveKey] = useState(1);
    const [isLoaderVisible, setIsLoaderVisible] = useState(true);
    const [modalView, setModalView] = useState('refer');
    const [isLoading, setIsLoading] = useState(false); /* isLoading for Form Antd */
    const [isVisible, setIsVisible] = useState(false);
    const [uniqueJob, setUniqueJob] = useState<any>();
    const [referred, setReferred] = useState('');

    const [formRef] = Form.useForm();

    const setNewCollapseKey = (key: number) => {
        setActiveKey(key);
    };

    const fetchData = async () => {
        setIsLoaderVisible(true);

        try {
            const jobOffers = await offerService.getOffersByRelevance();
            // const jobOffers: any = [];
            if (jobOffers.length > 0) {
                setJobs(jobOffers);
                setActiveKey(jobOffers[0].id);
            } else {
                setError({ exist: true, message: 'Aún no hay ofertas de trabajo disponibles.' });
            }
            setTimeout(() => {
                setIsLoaderVisible(false);
            }, 500);
        } catch {
            setError({ exist: true, message: 'Something went wrong' });
            setIsLoaderVisible(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    /* PRIVATE METHODS */
    const onFinish = () => {
        switch (modalView) {
            case 'refer':
                setIsLoading(true);
                const personReferred = formRef.getFieldValue(['referred']);
                referralsService
                    .send({ jobId: uniqueJob.id, referredEmail: personReferred })
                    .then((result) => {
                        setReferred(personReferred);
                        setModalView('refer-success');
                    })
                    .catch(() => {
                        // TODO - Show error message
                    })
                    .finally(() => {
                        setIsLoading(false);
                        formRef.resetFields();
                    });

                break;

            default:
                onCancel();
                break;
        }
    };
    const onCancel = () => {
        setIsVisible(false);
        setReferred('');
        setModalView('refer');
    };

    const openModal = (job: any) => {
        setUniqueJob(job);
        setIsVisible(true);
    };

    return {
        jobs,
        error,
        isLoaderVisible,
        isLoading,
        activeKey,
        setNewCollapseKey,
        isVisible,
        openModal,
        onCancel,
        onFinish,
        uniqueJob,
        formRef,
        modalView,
        referred,
    };
};
