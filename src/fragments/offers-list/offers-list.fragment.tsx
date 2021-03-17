import React from 'react';
import 'fragments/offers-list/offers-list.scss';
import { OffersListFragmentProps } from 'fragments/offers-list/interfaces';
import { useOffersListController } from 'fragments/offers-list/offers-list.controller';
import { Collapse, Input } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next/';
import FlexLoader from 'components/flex-loader/flex-loader.component';
import ModalForm from 'components/modal-form/modal-form.component';
import Form from 'antd/lib/form';
import moment from 'moment';

export const OffersListFragment: React.FC<OffersListFragmentProps> = (props) => {
    const { useController = useOffersListController } = props;
    const controller = useController();
    const { Panel } = Collapse;
    const { t } = useTranslation();

    function onItemCollapseChange(keyId: any) {
        controller.setNewCollapseKey(keyId);
    }

    const ModalReferContent =
        controller.modalView === 'refer' ? (
            <Form.Item name="referred" label={t(['general.referredEmail'])} rules={[{ required: true, type: 'email' }]}>
                <Input />
            </Form.Item>
        ) : (
            <div className="modal-referred-success">
                <p>
                    {' '}
                    {`Hemos envíado un email a `} <b> {controller.referred} </b> notificandole que ha sido recomendado
                    para el puesto de <b>{controller.uniqueJob.jobTitle}</b> en <b>{controller.uniqueJob.company}</b>.
                </p>
            </div>
        );

    // Render
    return (
        <div className={'job-offers-list'}>
            <ModalForm
                title={controller.modalView === 'refer' ? `Referir` : `Referencia exitosa.`}
                isVisible={controller.isVisible}
                form={controller.formRef}
                isLoading={controller.isLoading}
                onCancel={controller.onCancel}
                onFinish={controller.onFinish}
                okText={controller.modalView === 'refer' ? `Referir` : `Cerrar`}
            >
                {controller.modalView === 'refer' && (
                    <p>
                        La persona referida recibirá un correo electrónico con los detalles de la oferta seleccionada
                        para poder aplicar.{' '}
                    </p>
                )}

                {ModalReferContent}
            </ModalForm>
            {controller.isLoaderVisible ? (
                <div className="offers-collapse-container">
                    <FlexLoader />
                </div>
            ) : controller.error.exist ? (
                <div className="error-message">
                    <h2> {controller.error.message}</h2>
                </div>
            ) : (
                <Collapse
                    accordion
                    defaultActiveKey={controller.activeKey}
                    onChange={onItemCollapseChange}
                    style={{ borderRadius: '10px' }}
                >
                    {controller.jobs.map((item) => {
                        const createdAt = moment(item.createdAt).format('DD/MM/YYYY');
                        return (
                            <Panel
                                showArrow={false}
                                header={
                                    <div
                                        className={
                                            controller.activeKey === item.id
                                                ? 'custom_job_header_open'
                                                : 'custom_job_header'
                                        }
                                    >
                                        <img src={'logo-placeholder.png'} />
                                        <div className="custom_job_header_desc">
                                            <h2> {`${item.jobTitle} en ${item.company}`} </h2>
                                            <p>
                                                <CalendarOutlined /> {`${createdAt} por ${item.author}`}{' '}
                                            </p>
                                        </div>
                                        <p className={`relevance_index_${item.relevanceIndex}`}>
                                            {`IR: ${item.relevanceIndex}`}{' '}
                                        </p>
                                    </div>
                                }
                                key={item.id}
                            >
                                <div className="job-description">
                                    <h3>{t(['general.description'])}</h3>
                                    {/*<p>{item.description}</p>*/}
                                    <div dangerouslySetInnerHTML={{ __html: item.descriptionHTML }}></div>
                                    <div className="job-action-buttons">
                                        <div className="action-buttons">
                                            {/* <button className="btn-apply"> {t(['general.applyButton'])}</button> */}
                                            <button onClick={() => controller.openModal(item)} className="btn-reffer">
                                                {t(['general.referrButton'])}
                                            </button>
                                        </div>
                                        {/* <ShareAltOutlined style={{ fontSize: '20px', color: '#6f6f6f' }} /> */}
                                    </div>
                                </div>
                            </Panel>
                        );
                    })}
                </Collapse>
            )}
        </div>
    );
};
