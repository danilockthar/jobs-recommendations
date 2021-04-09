import { useState, useEffect } from 'react';
import { TeamFragmentController } from 'fragments/team-fragment/interfaces';
import { useAPIsubscriptionService } from 'services/subscription/subscription.service';
import { useAPICompanyService } from 'services/company/company.service';
import { useMessenger } from 'tools/view-hooks/messenger-hook';
import { message } from 'antd';
import { AxiosError } from 'axios';

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
    const [emailToInvitate, setEmailToInvitate] = useState({ value: '', error: '' });

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
                switch (err.response.status) {
                    case 404:
                        messenger.showErrorMessage({
                            key: 'Error al obtener datos de la empresa. Por favor ingrese un nombre para la misma.',
                        });
                        break;
                    case 401:
                        setCompany(err.response.data.company);
                        break;

                    default:
                        break;
                }
            })
            .finally(() => {
                setIsLoaderVisible(false);
            });
    };
    const toggleModal = () => {
        if (!isModalLoading) {
            setIsModalOpen(!isModalOpen);
        }
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
                messenger.showSuccessMessage({ key: 'Se ha eliminado un editor correctamente.' });
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setIsModalLoading(false);
                setisModalDeleteOpen(false);
            });
    };

    const sendInvitationEditor = () => {
        setIsModalLoading(true);
        companyService
            .sendInvitationEditor(emailToInvitate.value)
            .then((_) => {
                setIsModalLoading(false);
                setIsModalOpen(false);
                messenger.showSuccessMessage({ key: 'Invitado correctamente!' });
            })
            .catch((err: AxiosError) => {
                setIsModalLoading(false);
                setIsModalOpen(false);
                switch (err.response?.status) {
                    case 500:
                        messenger.showErrorMessage({ key: 'Ha ocurrido un error inesperado' });
                        break;

                    default:
                        messenger.showErrorMessage({ key: err.response?.data?.message });
                }
            });
    };

    const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!regex.test(e.target.value)) {
            setEmailToInvitate({ value: e.target.value, error: 'Invalido!' });
        } else {
            setEmailToInvitate({ value: e.target.value, error: '' });
        }
    };

    return {
        isLoaderVisible,
        company,
        dataSource,
        deleteEditor,
        confirmEditor,
        onChangeEmail,
        emailToInvitate,
        sendInvitationEditor,
        isLoading,
        isModalLoading,
        isModalOpen,
        isModalDeleteOpen,
        closeDeleteModal,
        toggleModal,
        editor,
    };
};
