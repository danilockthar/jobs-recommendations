import { RelevanceCardController } from 'fragments/relevance-card/interfaces';
import { useLocalSession } from 'auth/helpers/session.hooks';
import { useEffect, useState } from 'react';
import { useAPILinkedInService } from 'services/linkedin/linked-in.service';
import { useMessenger } from 'tools/view-hooks/messenger-hook';
import { LinkedInPersonDataDto } from 'services/linkedin/dtos/linked-in-person-data.dto';

export const useRelevanceCardController = (
    linkedInService = useAPILinkedInService(),
    messenger = useMessenger(),
): RelevanceCardController => {
    const [getSession] = useLocalSession();
    const session = getSession();

    const [userName, setUserName] = useState('');
    const [currentCompanyName, setCurrentCompanyName] = useState('');
    const [fieldOfStudy, setFieldOfStudy] = useState('');
    const [skillsLabel, setSkillsLabel] = useState('');
    const [isProfileComplete, setIsProfileComplete] = useState(false);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        setUserName(session.getUser()?.firstName + ' ' + session.getUser()?.lastName);
        fetchData();
    }, []);

    const fetchData = () => {
        linkedInService
            .findLinkedInPerson()
            .then(updateViewModel)
            .catch(() => {
                clearViewModel();
            });
    };

    const connect = () => {
        linkedInService
            .connectLinkedInPerson()
            .then(updateViewModel)
            .catch(() => {
                messenger.showErrorMessage({ key: 'Ocurrió un error al conectar cuenta' });
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
        connect,
        disconnect,
    };
};
