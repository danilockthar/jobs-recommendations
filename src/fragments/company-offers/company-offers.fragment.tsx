import React, { useContext } from 'react';
import 'fragments/company-offers/company-offers.scss';
import { Action, CompanyOffersFragmentProps, Filter, JobOfferViewModel } from 'fragments/company-offers/interfaces';
import { useCompanyOffersController } from 'fragments/company-offers/company-offers.controller';
import { useTranslation } from 'react-i18next/';
import { Link } from 'react-router-dom';
import { Collapse, Checkbox, Select, Switch, Tag } from 'antd';
import moment from 'moment';
import FlexLoader from 'components/flex-loader/flex-loader.component';
import { CalendarOutlined } from '@ant-design/icons';
import { useTranslator } from 'tools/view-hooks/translator-hook';

export const CompanyOffersFragment: React.FC<CompanyOffersFragmentProps> = (props) => {
    const { useController = useCompanyOffersController } = props;
    const controller = useController();
    const { Panel } = Collapse;
    const { translate } = useTranslator();
    const { Option } = Select;

    // Render
    return (
        <div className={'job-offers-list'}>
            {controller.isLoaderVisible ? (
                <div className="offers-collapse-container">
                    <FlexLoader />
                </div>
            ) : controller.errorExist ? (
                <div className="error-message">
                    <h2> {controller.errorMessage}</h2>
                </div>
            ) : (
                <div>
                    <div className={'action-wrapper'}>
                        <div className={'filter-wrapper'}>
                            <Select
                                defaultValue={translate({ key: 'general.select-action' })}
                                style={{ width: 160 }}
                                onChange={controller.handleSelect}
                            >
                                <Option value={Action.HIDE}>{translate({ key: 'general.hide-action' })}</Option>
                                <Option value={Action.PUBLISH}>{translate({ key: 'general.publish-action' })}</Option>
                            </Select>
                            <button
                                className={'apply-button-action'}
                                onClick={() => controller.changeJobStatus(controller.action)}
                            >
                                {' '}
                                {translate({ key: 'general.apply-button' })}
                            </button>
                        </div>
                        <div className={'filter-wrapper-right'}>
                            {/* <p> {JSON.stringify(controller.checkedID)} </p> */}
                            <div className="select-time-subscription">
                                <div className="select-time">
                                    <p
                                        className={`subscription-option ${
                                            controller.filter === Filter.ALL && 'active left-active'
                                        }`}
                                        onClick={() => controller.handleFilter(Filter.ALL)}
                                    >
                                        {' '}
                                        {translate({ key: 'general.all' })}
                                    </p>
                                    <p
                                        className={`subscription-option ${
                                            controller.filter === Filter.PUBLISHED && 'active'
                                        }`}
                                        onClick={() => controller.handleFilter(Filter.PUBLISHED)}
                                    >
                                        {' '}
                                        {translate({ key: 'general.published' })}
                                    </p>
                                    <p
                                        className={`subscription-option ${
                                            controller.filter === Filter.HIDDEN && 'active right-active'
                                        }`}
                                        onClick={() => controller.handleFilter(Filter.HIDDEN)}
                                    >
                                        {' '}
                                        {translate({ key: 'general.hidden' })}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {controller.filter === Filter.PUBLISHED ? (
                        <Collapse
                            accordion
                            defaultActiveKey={controller.activeKey}
                            onChange={controller.onItemCollapseChange}
                            style={{ borderRadius: '10px' }}
                        >
                            {controller.jobsViewModels
                                .filter((filt: JobOfferViewModel) => filt.status === 'PUBLIC')
                                .map((item: JobOfferViewModel) => {
                                    const createdAt = moment(item.createdAt).format('DD/MM/YYYY');
                                    return (
                                        <>
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
                                                        <Checkbox
                                                            value={item.id}
                                                            onChange={controller.handleCheckbox}
                                                            onClick={(event) => event.stopPropagation()}
                                                        />
                                                        <img src={'/placeholder.jpg'} />
                                                        <div className="custom_job_header_desc">
                                                            <h2> {`${item.jobTitle} en ${item.company}`} </h2>
                                                            <p>
                                                                <CalendarOutlined /> {`${createdAt} por ${item.author}`}
                                                            </p>
                                                        </div>
                                                        {item.status === 'HIDDEN' && (
                                                            <Tag> {translate({ key: 'general.hidden-tag' })}</Tag>
                                                        )}
                                                    </div>
                                                }
                                                key={item.id}
                                            >
                                                <div className="job-description">
                                                    <h3>{translate({ key: 'general.description' })}</h3>
                                                    <div
                                                        className="inner-job-description"
                                                        dangerouslySetInnerHTML={{ __html: item.descriptionHTML }}
                                                    ></div>
                                                </div>
                                            </Panel>
                                        </>
                                    );
                                })}
                        </Collapse>
                    ) : controller.filter === 'ALL' ? (
                        <Collapse
                            accordion
                            defaultActiveKey={controller.activeKey}
                            onChange={controller.onItemCollapseChange}
                            style={{ borderRadius: '10px' }}
                        >
                            {controller.jobsViewModels.map((item: JobOfferViewModel) => {
                                const createdAt = moment(item.createdAt).format('DD/MM/YYYY');
                                return (
                                    <>
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
                                                    <Checkbox
                                                        value={item.id}
                                                        onChange={controller.handleCheckbox}
                                                        onClick={(event) => event.stopPropagation()}
                                                    />
                                                    <img src={'/placeholder.jpg'} />
                                                    <div className="custom_job_header_desc">
                                                        <h2> {`${item.jobTitle} en ${item.company}`} </h2>
                                                        <p>
                                                            <CalendarOutlined /> {`${createdAt} por ${item.author}`}
                                                        </p>
                                                    </div>
                                                    {item.status === 'HIDDEN' && (
                                                        <Tag> {translate({ key: 'general.hidden-tag' })}</Tag>
                                                    )}{' '}
                                                </div>
                                            }
                                            key={item.id}
                                        >
                                            <div className="job-description">
                                                <h3>{translate({ key: 'general.description' })}</h3>
                                                <div
                                                    className="inner-job-description"
                                                    dangerouslySetInnerHTML={{ __html: item.descriptionHTML }}
                                                ></div>
                                            </div>
                                        </Panel>
                                    </>
                                );
                            })}
                        </Collapse>
                    ) : (
                        <Collapse
                            accordion
                            defaultActiveKey={controller.activeKey}
                            onChange={controller.onItemCollapseChange}
                            style={{ borderRadius: '10px' }}
                        >
                            {controller.jobsViewModels
                                .filter((filt: JobOfferViewModel) => filt.status === 'HIDDEN')
                                .map((item: JobOfferViewModel) => {
                                    const createdAt = moment(item.createdAt).format('DD/MM/YYYY');
                                    return (
                                        <>
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
                                                        <Checkbox
                                                            value={item.id}
                                                            onChange={controller.handleCheckbox}
                                                            onClick={(event) => event.stopPropagation()}
                                                        />
                                                        <img src={'/placeholder.jpg'} />
                                                        <div className="custom_job_header_desc">
                                                            <h2> {`${item.jobTitle} en ${item.company}`} </h2>
                                                            <p>
                                                                <CalendarOutlined /> {`${createdAt} por ${item.author}`}
                                                            </p>
                                                        </div>
                                                        {item.status === 'HIDDEN' && (
                                                            <Tag> {translate({ key: 'general.hidden-tag' })}</Tag>
                                                        )}
                                                    </div>
                                                }
                                                key={item.id}
                                            >
                                                <div className="job-description">
                                                    <h3>{translate({ key: 'general.description' })}</h3>
                                                    <div
                                                        className="inner-job-description"
                                                        dangerouslySetInnerHTML={{ __html: item.descriptionHTML }}
                                                    ></div>
                                                </div>
                                            </Panel>
                                        </>
                                    );
                                })}
                        </Collapse>
                    )}
                </div>
            )}
        </div>
    );
};
