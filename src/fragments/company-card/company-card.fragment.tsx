import React from 'react';
import 'fragments/company-card/company-card.scss';
import { CompanyCardFragmentProps } from 'fragments/company-card/interfaces';
import { Card, Form, Input } from 'antd';
import { useCompanyCardController } from 'fragments/company-card/company-card.controller';
import FlexLoader from 'components/flex-loader/flex-loader.component';
import { useTranslator } from 'tools/view-hooks/translator-hook';
import ModalForm from 'components/modal-form/modal-form.component';

export const CompanyCardFragment: React.FC<CompanyCardFragmentProps> = (props) => {
    const { useController = useCompanyCardController } = props;
    const controller = useController();
    const { translate } = useTranslator();

    // Render
    return (
        <div className={'relevance-user-data'}>
            <ModalForm
                title={translate({ key: 'Ingresá el id de tu empresa en LinkedIn' })}
                form={controller.importJobsForm}
                isVisible={controller.isImportFormVisible}
                isLoading={controller.isImportFormLoading}
                onFinish={controller.onImportJobsSubmitted}
            >
                <Form.Item label={translate({ key: 'Id Empresa' })} name="jobsUrl" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
            </ModalForm>
            <Card style={{ width: '100%', borderRadius: '10px', textAlign: 'center', border: '1px solid #d4d4d4' }}>
                <h2>{'Compania'}</h2>
                {controller.isLoaderVisible ? (
                    <FlexLoader />
                ) : (
                    <React.Fragment>
                        <img className="image-profile" src={''} />
                        <h3>{controller.companyName}</h3>
                        <button onClick={controller.onImportJobsPressed}>
                            {translate({ key: 'Importar Trabajos desde LinkedIn' })}
                        </button>
                    </React.Fragment>
                )}
            </Card>
        </div>
    );
};
