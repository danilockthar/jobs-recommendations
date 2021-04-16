import React, { useContext } from 'react';
import 'fragments/company-card/company-card.scss';
import { CompanyCardFragmentProps } from 'fragments/company-card/interfaces';
import { Card, Form, Input } from 'antd';
import { useLocalSession } from 'auth/helpers/session.hooks';
import { useCompanyCardController } from 'fragments/company-card/company-card.controller';
import FlexLoader from 'components/flex-loader/flex-loader.component';
import { useTranslator } from 'tools/view-hooks/translator-hook';
import ModalForm from 'components/modal-form/modal-form.component';
import { SessionContext } from 'auth/helpers/session.context';

export const CompanyCardFragment: React.FC<CompanyCardFragmentProps> = (props) => {
    const { useController = useCompanyCardController } = props;
    const controller = useController();
    const { translate } = useTranslator();

    const [getSession] = useLocalSession();
    const session = getSession();

    const { company } = useContext(SessionContext);

    // Render
    return (
        <div className={'relevance-company-data'}>
            {/* <ModalForm
                title={
                    controller.modalNameCompany
                        ? translate({ key: 'Ingresá el nombre de la organización.' })
                        : translate({ key: 'Ingresá la url de trabajo (LinkedIn)' })
                }
                form={controller.importJobsForm}
                isVisible={controller.modalNameCompany || controller.isImportFormVisible}
                isLoading={controller.isImportFormLoading}
                onCancel={controller.onImportFormCancel}
                onFinish={
                    controller.modalNameCompany ? controller.onNameCompanyAdded : controller.onImportJobsSubmitted
                }
            >
                {controller.modalNameCompany ? (
                    <Form.Item
                        label={translate({ key: 'Nombre de la organización' })}
                        name="name"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                ) : (
                    <Form.Item label={translate({ key: 'URL' })} name="jobsUrl" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                )}
            </ModalForm> */}
            <Card style={{ width: '100%', borderRadius: '60px', textAlign: 'center', border: '1px solid #d4d4d4' }}>
                <div className={'card-company-wrapper'}>
                    <div className={'card-company-data-wrapper'}>
                        <h4> {company.name ?? ''}</h4>
                        <p>Agustín Campos - Administrador de la organización</p>
                    </div>
                    <button className={'btn-company-data'}> Actualizar Trabajos</button>
                </div>
                {/* {controller.isLoaderVisible ? (
                    <FlexLoader />
                ) : (
                    <React.Fragment>
                        
                        <h3>{controller.companyName}</h3>
                        {props.isEditor ? (
                            ''
                        ) : (
                            <button onClick={controller.onImportJobsPressed}>
                                {translate({ key: 'Importar Trabajos desde LinkedIn' })}
                            </button>
                        )}
                    </React.Fragment>
                )} */}
            </Card>
        </div>
    );
};
