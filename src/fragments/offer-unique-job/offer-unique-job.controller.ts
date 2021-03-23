import { useState, useEffect } from 'react';
import { OfferUniqueJobController, JobOfferViewModel } from 'fragments/offer-unique-job/interfaces';
import { useParams } from 'react-router';
import { useApiOffersListService } from 'services/offers-list/offers-list.service';
import { useApiReferralService } from 'services/referrals/referrals.service';
import { Form } from 'antd';
import { useAPILinkedInService } from 'services/linkedin/linked-in.service';
import { LinkedInJobDto } from 'services/linkedin/dtos/linked-in-job.dto';
import { useMessenger } from 'tools/view-hooks/messenger-hook';

export const useOfferUniqueJobController = (
    offerService = useApiOffersListService(),
    referralsService = useApiReferralService(),
    messenger = useMessenger(),
    linkedInService = useAPILinkedInService(),
): /* <--Dependency Injections  like services hooks */
OfferUniqueJobController => {
    const { id } = useParams<{ id: string }>();
    /* State */
    // Ex. const [count, setCount] = useState(0);
    const [example, setExample] = useState('example');
    const [jobs, setJobs] = useState<LinkedInJobDto>();
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
            .getOneJobByID(parseInt(id, 10))
            .then((output) => {
                if (output) {
                    // setActiveKey(output[0].jobId);
                    setJobs(output);
                } else {
                    setError({ exist: true, message: 'Aún no hay ofertas de trabajo disponibles.' });
                }
            })
            .catch((err) => {
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

    /* PRIVATE METHODS */
    const onFinish = () => {
        let personReferred: any;
        switch (modalView) {
            case 'refer':
                setIsLoading(true);
                personReferred = formRef.getFieldValue(['referred']);
                referralsService
                    .send({ job: parseInt(uniqueJob.jobId, 10), referredEmail: personReferred })
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
        openModal,
        onCancel,
        onFinish,
        isVisible,
        uniqueJob,
        formRef,
        modalView,
        referred,
    };
};
