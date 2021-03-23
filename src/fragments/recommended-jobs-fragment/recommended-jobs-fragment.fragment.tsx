import React from 'react';
import 'fragments/recommended-jobs-fragment/recommended-jobs-fragment.scss';
import { Collapse, Input } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import moment from 'moment';
import { useTranslation } from 'react-i18next/';
import { RecommendedJobsFragmentFragmentProps } from 'fragments/recommended-jobs-fragment/interfaces';
import { useRecommendedJobsFragmentController } from 'fragments/recommended-jobs-fragment/recommended-jobs-fragment.controller';

export const RecommendedJobsFragmentFragment: React.FC<RecommendedJobsFragmentFragmentProps> = (props) => {
    const { useController = useRecommendedJobsFragmentController } = props;
    const controller = useController();
    const { Panel } = Collapse;
    const { t } = useTranslation();

    function onItemCollapseChange(keyId: any) {
        controller.setNewCollapseKey(keyId);
    }

    console.log(controller.jobs.length);

    return (
        <div className={'recommended-jobs-fragment'}>
            {controller.jobs.length > 0 ? (
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
                                        <img src={'/placeholder.jpg'} />
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
                                    <div
                                        className="inner-job-description"
                                        dangerouslySetInnerHTML={{ __html: item.descriptionHTML }}
                                    ></div>
                                    <div className="job-action-buttons">
                                        <div className="action-buttons">
                                            <a className="btn-apply" href={item.link} target="_blank" rel="noreferrer">
                                                {' '}
                                                {t(['general.applyButton'])}
                                            </a>
                                            {/* <button onClick={() => controller.openModal(item)} className="btn-reffer">
                                        {t(['general.referrButton'])}
                                    </button> */}
                                        </div>
                                        {/* <ShareAltOutlined style={{ fontSize: '20px', color: '#6f6f6f' }} /> */}
                                    </div>
                                </div>
                            </Panel>
                        );
                    })}
                </Collapse>
            ) : (
                <h2> Aún no tienes recomendaciones de trabajo</h2>
            )}
        </div>
    );
};
