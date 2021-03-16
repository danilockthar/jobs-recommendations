import { useState, useEffect } from 'react';
import { CompanyOffersController } from 'fragments/company-offers/interfaces';
import { useApiOffersListService } from 'services/offers-list/offers-list.service';
import { JobOfferViewModel } from 'fragments/company-offers/interfaces';
import { Form } from 'antd';

export const useCompanyOffersController = (
    offerService = useApiOffersListService(),
): /* <--Dependency Injections  like services hooks */
CompanyOffersController => {
    const [jobs, setJobs] = useState<JobOfferViewModel[]>([]);
    const [error, setError] = useState({ exist: false, message: '' });
    const [activeKey, setActiveKey] = useState(1);
    const [isLoaderVisible, setIsLoaderVisible] = useState(true);
    const [modalView, setModalView] = useState('refer');
    const [isLoading, setIsLoading] = useState(false); /* isLoading for Form Antd */
    const [isVisible, setIsVisible] = useState(false);
    const [uniqueJob, setUniqueJob] = useState({});
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
                setTimeout(() => {
                    const personReferred = formRef.getFieldValue(['referred']);
                    setReferred(personReferred);
                    setIsLoading(false);
                    setModalView('refer-success');
                    formRef.resetFields();
                }, 1500);

                break;

            default:
                onCancel();
                setReferred('');
                setModalView('refer');
                break;
        }
    };
    const onCancel = () => {
        setIsVisible(false);
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
