import { RelevanceCardController } from 'fragments/relevance-card/interfaces';
import { useLocalSession } from 'auth/helpers/session.hooks';
import { useEffect, useState } from 'react';
import { ConnectLinkedInPersonInput, useAPILinkedInService } from 'services/linkedin/linked-in.service';
import { useMessenger } from 'tools/view-hooks/messenger-hook';
import { LinkedInPersonDataDto } from 'services/linkedin/dtos/linked-in-person-data.dto';
import { Form } from 'antd';
import { plainToClass } from 'class-transformer';

export const useRelevanceCardController = (
    linkedInService = useAPILinkedInService(),
    messenger = useMessenger(),
    useConnectForm = Form.useForm,
): RelevanceCardController => {
    const [getSession] = useLocalSession();
    const session = getSession();
    const [connectForm] = useConnectForm();

    const [userName, setUserName] = useState('');
    const [currentCompanyName, setCurrentCompanyName] = useState('');
    const [fieldOfStudy, setFieldOfStudy] = useState('');
    const [skillsLabel, setSkillsLabel] = useState('');
    const [isProfileComplete, setIsProfileComplete] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const [isConnectFormVisible, setIsConnectFormVisible] = useState(false);
    const [isConnectFormLoading, setIsConnectFormLoading] = useState(false);

    useEffect(() => {
        setUserName(session.getUser()?.firstName + ' ' + session.getUser()?.lastName);
        fetchData();
    }, []);

    const fetchData = () => {
        linkedInService
            .getLinkedInPerson()
            .then((output) => {
                if (output) {
                    updateViewModel(output);
                } else {
                    clearViewModel();
                }
            })
            .catch(() => {
                clearViewModel();
            });
    };

    const disconnect = () => {
        linkedInService
            .disconnectLinkedInPerson()
            .then(clearViewModel)
            .catch(() => {
                messenger.showErrorMessage({ key: 'Ocurrió un error al desconectar cuenta' });
            });
    };

    const onConnectButtonPressed = () => {
        connectForm.resetFields();
        setIsConnectFormVisible(true);
    };

    const onConnectFormSubmit = (inputs: unknown) => {
        setIsConnectFormLoading(true);
        const input = plainToClass(ConnectLinkedInPersonInput, inputs);
        linkedInService
            .connectLinkedInPerson(input)
            .then((output) => {
                setIsConnectFormVisible(false);
                updateViewModel(output);
            })
            .catch(() => {
                messenger.showErrorMessage({ key: 'Ocurrió un error al conectar cuenta' });
            })
            .finally(() => {
                setIsConnectFormLoading(false);
            });
    };

    /*Private Methods*/

    const updateViewModel = (dto: LinkedInPersonDataDto) => {
        setCurrentCompanyName(dto.positions?.shift()?.companyName ?? '');
        setFieldOfStudy(dto.fieldOfStudy ?? '');
        setSkillsLabel(`${dto.skills?.length} Skills`);
        setIsProfileComplete(false);
        setIsConnected(true);
    };

    const clearViewModel = () => {
        setCurrentCompanyName('');
        setFieldOfStudy('');
        setSkillsLabel('');
        setIsProfileComplete(false);
        setIsConnected(false);
    };

    return {
        userName,
        currentCompanyName,
        fieldOfStudy,
        skillsLabel,
        isProfileComplete,
        isConnected,
        connectForm,
        isConnectFormVisible,
        isConnectFormLoading,
        disconnect,
        onConnectButtonPressed,
        onConnectFormSubmit,
    };
};
