import { useState, useEffect } from 'react';
import { TeamFragmentController } from 'fragments/team-fragment/interfaces';
import { useAPIsubscriptionService } from 'services/subscription/subscription.service';
import { useAPICompanyService } from 'services/company/company.service';
import { useMessenger } from 'tools/view-hooks/messenger-hook';

export const useTeamFragmentController = (
    subscribptionService = useAPIsubscriptionService(),
    companyService = useAPICompanyService(),
    messenger = useMessenger(),
): /* <--Dependency Injections  like services hooks */
TeamFragmentController => {
    const [isLoaderVisible, setIsLoaderVisible] = useState(false);
    const [company, setCompany] = useState<any>({ editors: [] });

    useEffect(() => {
        fetchData();
    }, []);

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
            .catch((err) => {
                if (err.response.status === 404) {
                    messenger.showErrorMessage({
                        key: 'Error al obtener datos de la empresa. Por favor ingrese un nombre para la misma.',
                    });
                }
            })
            .finally(() => {
                setIsLoaderVisible(false);
            });
    };
    const onButtonPressed = () => {
        // Example event
    };
    return { isLoaderVisible, company };
};
