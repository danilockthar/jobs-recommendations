import { useContext, useEffect, useState } from 'react';
import { CompanyCardController } from 'fragments/company-card/interfaces';
import { ImportLinkedInJobsInput, useAPILinkedInService } from 'services/linkedin/linked-in.service';
import { CompanyDto, useAPICompanyService } from 'services/company/company.service';
import { useMessenger } from 'tools/view-hooks/messenger-hook';
import { Form } from 'antd';
import { plainToClass } from 'class-transformer';
import { LinkedInJobsContext } from 'services/linkedin/linked-in-jobs.context';

export const useCompanyCardController = (
    companyService = useAPICompanyService(),
    linkedInService = useAPILinkedInService(),
    messenger = useMessenger(),
    useImportForm = Form.useForm,
): CompanyCardController => {
    const [importJobsForm] = useImportForm();

    const [companyName, setCompanyName] = useState('');
    const [isLoaderVisible, setIsLoaderVisible] = useState(true);
    const [modalNameCompany, setModalNameCompany] = useState(false);
    const [isImportFormVisible, setIsImportFormVisible] = useState(false);
    const [isImportFormLoading, setIsImportFormLoading] = useState(false);
    const { setJobs } = useContext(LinkedInJobsContext);

    useEffect(() => {
        fetchCompanyData();
    }, []);

    const fetchCompanyData = () => {
        setIsLoaderVisible(true);
        companyService
            .getCompany()
            .then((output) => {
                const name = output.name ?? '';
                setCompanyName(name);
            })
            .catch((err) => {
                if (err.response.status === 404) {
                    setModalNameCompany(true);
                    messenger.showErrorMessage({
                        key: 'Error al obtener datos de la empresa. Por favor ingrese un nombre para la misma.',
                    });
                }
            })
            .finally(() => {
                setIsLoaderVisible(false);
            });
    };

    const onImportJobsPressed = () => {
        setIsImportFormVisible(true);
    };
    const onNameCompanyAdded = async (inputs: unknown) => {
        setIsImportFormLoading(true);
        const input = plainToClass(CompanyDto, inputs);
        companyService
            .createCompany(input)
            .then((output) => {
                console.log(output, 'a');
            })
            .catch((err) => {
                messenger.showErrorMessage({ key: 'Ocurrió un problema al ingresar el nombre.' });
            })
            .finally(() => {
                setIsImportFormLoading(false);
                setModalNameCompany(false);
            });
    };
    const onImportJobsSubmitted = (inputs: unknown) => {
        setIsImportFormLoading(true);
        const input = plainToClass(ImportLinkedInJobsInput, inputs);
        linkedInService
            .importLinkedInJobs(input)
            .then((output) => {
                setIsImportFormVisible(false);
                setJobs(output);
            })
            .catch(() => {
                messenger.showErrorMessage({ key: 'Ocurrió un problema al importar trabajos' });
            })
            .finally(() => {
                setIsImportFormLoading(false);
            });
    };

    const onImportFormCancel = () => {
        setIsImportFormVisible(false);
    };

    return {
        companyName,
        isLoaderVisible,
        importJobsForm,
        isImportFormVisible,
        isImportFormLoading,
        onImportJobsPressed,
        onImportJobsSubmitted,
        onImportFormCancel,
        modalNameCompany,
        onNameCompanyAdded,
    };
};
