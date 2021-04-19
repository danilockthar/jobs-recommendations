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
    const [subtitle, setSubtitle] = useState('');
    const [modalNameCompany, setModalNameCompany] = useState(false);
    const [isImportFormVisible, setIsImportFormVisible] = useState(false);
    const [isImportFormLoading, setIsImportFormLoading] = useState(false);
    const { setJobs } = useContext(LinkedInJobsContext);

    const onImportJobsPressed = () => {
        setIsImportFormVisible(true);
    };
    const onNameCompanyAdded = async (inputs: unknown) => {
        setIsImportFormLoading(true);
        const input = plainToClass(CompanyDto, inputs);
        companyService
            .createCompany(input)
            .then((output) => {
                // Nothing to do here by the moment.
            })
            .catch((err) => {
                messenger.showErrorMessage({ key: 'company-card.error-creating-company' });
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
        subtitle,
        onNameCompanyAdded,
    };
};
