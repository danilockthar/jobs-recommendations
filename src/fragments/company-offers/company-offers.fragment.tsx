import React from 'react';
import 'fragments/company-offers/company-offers.scss';
import { CompanyOffersFragmentProps, JobOfferViewModel } from 'fragments/company-offers/interfaces';
import { useCompanyOffersController } from 'fragments/company-offers/company-offers.controller';
import { useTranslation } from 'react-i18next/';
import { Collapse } from 'antd';
import moment from 'moment';
import FlexLoader from 'components/flex-loader/flex-loader.component';
import { CalendarOutlined } from '@ant-design/icons';

export const CompanyOffersFragment: React.FC<CompanyOffersFragmentProps> = (props) => {
    const { useController = useCompanyOffersController } = props;
    const controller = useController();
    const { Panel } = Collapse;
    const { t } = useTranslation();

    function onItemCollapseChange(keyId: any) {
        controller.setNewCollapseKey(parseInt(keyId, 10));
    }

    // Render
    return (
        <div className={'job-offers-list'}>
            {controller.isLoaderVisible ? (
                <div className="offers-collapse-container">
                    <FlexLoader />
                </div>
            ) : (
                <Collapse
                    accordion
                    defaultActiveKey={controller.activeKey}
                    onChange={onItemCollapseChange}
                    style={{ borderRadius: '10px' }}
                >
                    {controller.jobsViewModels.map((item: JobOfferViewModel) => {
                        const createdAt = moment(item.createdAt).format('DD/MM/YYYY');
                        return (
                            <Panel
                                showArrow={false}
                                header={
                                    <div
                                        onClick={(event) => controller.activeKey === item.id && event.stopPropagation()}
                                        className={
                                            controller.activeKey === item.id
                                                ? 'custom_job_header_open'
                                                : 'custom_job_header'
                                        }
                                    >
                                        <img src={item.logo} />
                                        <div className="custom_job_header_desc">
                                            <h2> {`${item.jobTitle} en ${item.company}`} </h2>
                                            <p>
                                                <CalendarOutlined /> {`${createdAt} por ${item.author}`}
                                            </p>
                                        </div>
                                    </div>
                                }
                                key={item.id}
                            >
                                <div className="job-description">
                                    <h3>{t(['general.description'])}</h3>
                                    <p>{item.description}</p>
                                </div>
                            </Panel>
                        );
                    })}
                </Collapse>
            )}
        </div>
    );
};
