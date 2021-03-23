import React from 'react';
import 'fragments/offer-unique-job/offer-unique-job.scss';
import { OfferUniqueJobFragmentProps } from 'fragments/offer-unique-job/interfaces';
import { useOfferUniqueJobController } from 'fragments/offer-unique-job/offer-unique-job.controller';
import { Collapse, Input } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next/';
import FlexLoader from 'components/flex-loader/flex-loader.component';
import ModalForm from 'components/modal-form/modal-form.component';
import Form from 'antd/lib/form';
import moment from 'moment';

export const OfferUniqueJobFragment: React.FC<OfferUniqueJobFragmentProps> = (props) => {
    const { useController = useOfferUniqueJobController } = props;
    const controller = useController();

    const { Panel } = Collapse;
    const { t } = useTranslation();

    // const createdAt = moment(controller.jobs[0].createdAt).format('DD/MM/YYYY');

    // Render
    return (
        <div className={'job-offers-list'}>
            {controller.isLoaderVisible ? (
                <div className="offers-collapse-container">
                    <FlexLoader />
                </div>
            ) : controller.error.exist ? (
                <div className="error-message">
                    <h2> {controller.error.message}</h2>
                </div>
            ) : (
                <Collapse accordion defaultActiveKey={controller.activeKey} style={{ borderRadius: '10px' }}>
                    <Panel
                        showArrow={false}
                        header={
                            <div
                                className={
                                    controller.activeKey === controller.jobs.jobId
                                        ? 'custom_job_header_open'
                                        : 'custom_job_header'
                                }
                            >
                                <img src={'/placeholder.jpg'} />
                                <div className="custom_job_header_desc">
                                    <h2> {`${controller.jobs.title} en ${controller.jobs.company}`} </h2>
                                    <p>
                                        <CalendarOutlined /> {`${controller.jobs.date} por ${controller.jobs.company}`}{' '}
                                    </p>
                                </div>
                                <p className={`relevance_index_${controller.jobs.relevanceIndex}`}>
                                    {`IR: ${controller.jobs.relevanceIndex}`}{' '}
                                </p>
                            </div>
                        }
                        key={controller.jobs.id}
                    >
                        <div className="job-description">
                            <h3>{t(['general.description'])}</h3>
                            {/*<p>{controller.jobs.description}</p>*/}
                            <div
                                className="inner-job-description"
                                dangerouslySetInnerHTML={{ __html: controller.jobs.descriptionHTML }}
                            ></div>
                            <div className="job-action-buttons">
                                <div className="action-buttons">
                                    <button
                                        onClick={() => controller.openModal(controller.jobs, 'refer')}
                                        className="btn-reffer"
                                    >
                                        {t(['general.referrButton'])}
                                    </button>
                                </div>
                                {/* <ShareAltOutlined style={{ fontSize: '20px', color: '#6f6f6f' }} /> */}
                            </div>
                        </div>
                    </Panel>
                </Collapse>
            )}
        </div>
    );
};
