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
    const [isModalDeleteOpen, setisModalDeleteOpen] = useState(false);
    const [isModalLoading, setIsModalLoading] = useState(false);
    const [editor, setEditor] = useState({ id: 0, email: '' });

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const data: any[] = [];
        if (company.editors.length > 0) {
            company.editors.map((item: any, index: any) =>
                data.push({
                    key: index,
                    id: item.id,
                    name: item.firstName,
                    lastname: item.lastName,
                    email: item.email,
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

    const confirmEditor = (id: number, email: string) => {
        setEditor({ id, email });
        setisModalDeleteOpen(true);
    };

    const closeDeleteModal = () => {
        setisModalDeleteOpen(false);
    };

    const deleteEditor = async (id: number, email: string) => {
        setIsModalLoading(true);
        companyService
            .deleteCompanyEditor(id)
            .then((output) => {
                setDataSource((prevstate: any) => prevstate.filter((item: any) => item.id !== id));
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setIsModalLoading(false);
                setisModalDeleteOpen(false);
            });
    };

    return {
        isLoaderVisible,
        company,
        dataSource,
        deleteEditor,
        confirmEditor,
        isLoading,
        isModalLoading,
        isModalOpen,
        isModalDeleteOpen,
        closeDeleteModal,
        toggleModal,
        editor,
    };
};
