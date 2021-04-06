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
    const [dataSource, setDataSource] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const data: any[] = [];
        console.log(company.editors, 'editors:');
        if (company.editors.length > 0) {
            company.editors.map((item: any, index: any) =>
                data.push({
                    key: index,
                    id: item.id,
                    name: item.firstName,
                    lastname: item.lastName,
                    email: item.lastName,
                }),
            );
            setDataSource(data);
        }
    }, [company.editors]);

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
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const deleteEditor = async (id: number) => {
        setIsLoading(true);
        companyService
            .deleteCompanyEditor(id)
            .then((output) => {
                setDataSource((prevstate: any) => prevstate.filter((item: any) => item.id !== id));
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setTimeout(() => {
                    setIsLoading(false);
                }, 200);
            });
    };

    return { isLoaderVisible, company, dataSource, deleteEditor, isLoading, isModalOpen, toggleModal };
};
