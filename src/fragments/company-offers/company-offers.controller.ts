import { useState, useEffect, useContext } from 'react';
import { CompanyOffersController } from 'fragments/company-offers/interfaces';
import { JobOfferViewModel } from 'fragments/company-offers/interfaces';
import { useMessenger } from 'tools/view-hooks/messenger-hook';
import { useAPILinkedInService } from 'services/linkedin/linked-in.service';
import { LinkedInJobDto } from 'services/linkedin/dtos/linked-in-job.dto';
import { LinkedInJobsContext } from 'services/linkedin/linked-in-jobs.context';
import { useAPICompanyService } from 'services/company/company.service';
import { AxiosError } from 'axios';

export const useCompanyOffersController = (
    messenger = useMessenger(),
    linkedInService = useAPILinkedInService(),
    companyService = useAPICompanyService(),
): CompanyOffersController => {
    const [isLoading, setIsLoading] = useState(false);
    const [jobsViewModels, setJobsViewModels] = useState<JobOfferViewModel[]>([]);
    const [company, setCompany] = useState<any>({ subscriptions: [] });
    const [activeKey, setActiveKey] = useState('');
    const [filter, setFilter] = useState('ALL');
    const [action, setAction] = useState('PUBLISH');
    const [checkedID, setCheckedID] = useState<string[]>([]);
    const [isLoaderVisible, setIsLoaderVisible] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [errorExist, setErrorExist] = useState(true);

    const { jobs } = useContext(LinkedInJobsContext);

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const viewModels = jobs.map(mapDtoToViewModel);
        if (viewModels.length > 0) {
            setErrorExist(false);
            setErrorMessage('');
        }
        setJobsViewModels(viewModels);
    }, [jobs]);

    const setNewCollapseKey = (key: string) => {
        setActiveKey(key);
    };

    const changeJobStatus = async (action: string) => {
        setIsLoaderVisible(true);
        if (checkedID.length > 0) {
            linkedInService
                .editJobsStatus(checkedID, action)
                .then((output) => {
                    const jobcopy = [...jobsViewModels];
                    const newArr = jobcopy.map((item) => {
                        checkedID.map((ite, index) => {
                            if (item.id === ite) {
                                switch (action) {
                                    case 'PUBLISH':
                                        item.status = 'PUBLIC';
                                        break;
                                    default:
                                        item.status = 'HIDDEN';
                                        break;
                                }
                            }
                            return ite;
                        });
                        return item;
                    });
                    setCheckedID([]);
                    setJobsViewModels(newArr);
                    // setJobsViewModels((prev) => {
                    //     prev.map((item) => {
                    //         checkedID.map((ite, index) => {
                    //             if (item.id === ite) {
                    //                 switch (item.status) {
                    //                     case 'PUBLIC':
                    //                         item.status = 'HIDDEN';
                    //                         break;
                    //                     default:
                    //                         item.status = 'PUBLIC';
                    //                         break;
                    //                 }
                    //             }
                    //             return ite;
                    //         });
                    //         return item;
                    //     });
                    //     return prev;
                    // });
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    setIsLoaderVisible(false);
                });
        } else {
            setIsLoaderVisible(false);
        }
    };

    const handleSelect = (value: any) => {
        if (value === 'PUBLISHED' || value === 'HIDDEN' || value === 'ALL') {
            setFilter(value);
            setCheckedID([]);
        } else {
            setAction(value);
        }
    };

    const handleCheckbox = (e: any) => {
        if (checkedID.includes(e.target.value)) {
            setCheckedID((prev) => prev.filter((item) => item !== e.target.value));
        } else {
            setCheckedID((prev) => [...prev, e.target.value]);
        }
    };

    const fetchData = () => {
        setIsLoaderVisible(true);
        companyService
            .getCompany()
            .then((output) => {
                if (output.id) {
                    setCompany(output);
                } else {
                    messenger.showErrorMessage({
                        key: 'Error al obtener datos de la organización.',
                    });
                }
            })
            .catch((err: AxiosError) => {
                switch (err.response?.data?.code) {
                    case 'company_overcame_limit_editors':
                        messenger.showErrorMessage({
                            key: 'La organización superó el limite de editores disponibles.',
                        });
                        break;
                    case 'subscription_canceled':
                        messenger.showErrorMessage({
                            key: 'Haz cancelado una membresía y el período de prueba ha finalizado.',
                        });
                        break;
                    default:
                        // messenger.showErrorMessage({
                        //     key: 'Error al obtener datos de la empresa. Por favor ingrese un nombre para la misma.',
                        // });
                        break;
                }
            })
            .finally(() => {
                linkedInService
                    .findLinkedInJobs()
                    .then((output) => {
                        if (output.length == 0) {
                            setErrorExist(true);
                            setErrorMessage('Aún no hay trabajos cargados.');
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
                    });
                setIsLoaderVisible(false);
            });
    };

    /* Private Methods */
    const mapDtoToViewModel = (dto: LinkedInJobDto): JobOfferViewModel => {
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
            status: dto.status ?? '',
            type: '',
        };
    };

    return {
        jobsViewModels,
        company,
        isLoaderVisible,
        activeKey,
        errorMessage,
        errorExist,
        handleSelect,
        checkedID,
        action,
        changeJobStatus,
        filter,
        handleCheckbox,
        setNewCollapseKey,
    };
};
