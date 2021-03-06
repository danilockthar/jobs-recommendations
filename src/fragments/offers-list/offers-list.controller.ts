import { useState, useEffect } from 'react';
import { OffersListController, JobOfferViewModel } from 'fragments/offers-list/interfaces';
import { useApiOffersListService } from 'services/offers-list/offers-list.service';
import { useApiReferralService } from 'services/referrals/referrals.service';
import { Form } from 'antd';
import { useAPILinkedInService } from 'services/linkedin/linked-in.service';
import { LinkedInJobDto } from 'services/linkedin/dtos/linked-in-job.dto';
import { useMessenger } from 'tools/view-hooks/messenger-hook';

export const useOffersListController = (
    offerService = useApiOffersListService(),
    referralsService = useApiReferralService(),
    messenger = useMessenger(),
    linkedInService = useAPILinkedInService(),
): /* <--Dependency Injections  like services hooks */ OffersListController => {
    const [jobs, setJobs] = useState<JobOfferViewModel[]>([]);
    const [error, setError] = useState({ exist: false, message: '' });
    const [activeKey, setActiveKey] = useState('');
    const [isLoaderVisible, setIsLoaderVisible] = useState(true);
    const [modalView, setModalView] = useState('refer');
    const [isLoading, setIsLoading] = useState(false); /* isLoading for Form Antd */
    const [isVisible, setIsVisible] = useState(false);
    const [uniqueJob, setUniqueJob] = useState<any>();
    const [referred, setReferred] = useState('');

    const [formRef] = Form.useForm();

    useEffect(() => {
        fetchData();
    }, []);

    const setNewCollapseKey = (key: string) => {
        setActiveKey(key);
    };

    const fetchData = async () => {
        setIsLoaderVisible(true);

        linkedInService
            .findLinkedInJobs()
            .then((output) => {
                if (output.length > 0) {
                    // setActiveKey(output[0].jobId);
                    setJobs(output.map(mapDtoToViewModel));
                } else {
                    setError({ exist: true, message: 'Aún no hay ofertas de trabajo disponibles.' });
                }
            })
            .catch((err) => {
                switch (err.response.status) {
                    case 409:
                        setError({ exist: true, message: 'Conecte su perfil de LinkedIn.' });
                        break;
                    case 404:
                        setError({ exist: true, message: 'No hay trabajos disponibles.' });
                        break;
                    default:
                        setError({ exist: true, message: 'Algo salió mal, intente nuevamente.' });
                        break;
                }
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
            relevanceIndex: dto.relevanceIndex ?? 0,
            status: false,
            type: '',
        };
    };

    /* PRIVATE METHODS */
    const onFinish = () => {
        let personReferred: any;
        switch (modalView) {
            case 'refer':
                setIsLoading(true);
                personReferred = formRef.getFieldValue(['referred']);
                referralsService
                    .send({ job: parseInt(uniqueJob.id, 10), referredEmail: personReferred })
                    .then((result) => {
                        setReferred(personReferred);
                        setModalView('refer-success');
                    })
                    .catch((err) => {
                        if (err.response.status === 403) {
                            messenger.showErrorMessage({
                                key: 'Este perfil ya ha sido referido previamente.',
                            });
                        }
                        // TODO - Show error message
                    })
                    .finally(() => {
                        setIsLoading(false);
                        formRef.resetFields();
                    });

                break;
            case 'apply':
                setIsLoading(true);
                personReferred = formRef.getFieldValue(['referred']);
                referralsService
                    .askForReferral({ job: parseInt(uniqueJob.id, 10), referrerEmail: personReferred })
                    .then((result) => {
                        setReferred(personReferred);
                        setModalView('apply-success');
                    })
                    .catch((err) => {
                        console.log(err, 'err');
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

    const openModal = (job: any, action: string) => {
        switch (action) {
            case 'refer':
                setModalView('refer');
                break;

            default:
                setModalView('apply');
                break;
        }
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
