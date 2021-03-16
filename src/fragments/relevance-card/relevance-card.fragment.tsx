import React from 'react';
import 'fragments/relevance-card/relevance-card.scss';
import { RelevanceCardFragmentProps } from 'fragments/relevance-card/interfaces';
import { useRelevanceCardController } from 'fragments/relevance-card/relevance-card.controller';
import { Card, Form, Input } from 'antd';
import { useTranslation } from 'react-i18next/';
import ModalForm from 'components/modal-form/modal-form.component';
import { useTranslator } from 'tools/view-hooks/translator-hook';

export const RelevanceCardFragment: React.FC<RelevanceCardFragmentProps> = (props) => {
    const { useController = useRelevanceCardController } = props;
    const controller = useController();
    const { translate } = useTranslator();
    const { t } = useTranslation();

    // Render
    return (
        <div className={'relevance-user-data'}>
            <ModalForm
                title={translate({ key: 'Ingresá tu usuario de LinkedIn' })}
                form={controller.connectForm}
                isVisible={controller.isConnectFormVisible}
                isLoading={controller.isConnectFormLoading}
                onFinish={controller.onConnectFormSubmit}
            >
                <Form.Item label={translate({ key: 'Usuario' })} name="vanityName" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
            </ModalForm>
            <Card style={{ width: '100%', borderRadius: '10px', textAlign: 'center', border: '1px solid #d4d4d4' }}>
                <h2>{translate({ key: 'general.relevanceIndex' })}</h2>
                <React.Fragment>
                    <img className="image-profile" src={''} />
                    <h3>{controller.userName}</h3>
                    <p>{controller.currentCompanyName}</p>
                    <p>{controller.fieldOfStudy}</p>
                    <p>{controller.skillsLabel}</p>
                    {controller.isProfileComplete ? <p>Perfil Incompleto</p> : null}
                    {controller.isConnected ? (
                        <>
                            <button onClick={() => window.open('https://www.linkedin.com/in/', '_blank')}>
                                {t(['general.linkedInModifyButton'])}
                            </button>
                            <button onClick={controller.disconnect} className={'button-desvinculate'}>
                                {t(['general.linkedinDesvinculate'])}
                            </button>
                        </>
                    ) : (
                        <button onClick={controller.onConnectButtonPressed}>
                            {t(['general.connectWithLinkedin'])}
                        </button>
                    )}
                </React.Fragment>
            </Card>
        </div>
    );
};
