import React from 'react';
import 'fragments/company-offers/company-offers.scss';
import { CompanyOffersFragmentProps, JobOfferViewModel } from 'fragments/company-offers/interfaces';
import { useCompanyOffersController } from 'fragments/company-offers/company-offers.controller';
import { useTranslation } from 'react-i18next/';
import { Link } from 'react-router-dom';
import { Collapse, Checkbox, Select, Switch, Tag } from 'antd';
import moment from 'moment';
import FlexLoader from 'components/flex-loader/flex-loader.component';
import { CalendarOutlined, LoadingOutlined, LockOutlined } from '@ant-design/icons';

export const CompanyOffersFragment: React.FC<CompanyOffersFragmentProps> = (props) => {
    const { useController = useCompanyOffersController } = props;
    const controller = useController();
    const { Panel } = Collapse;
    const { t } = useTranslation();

    const { Option } = Select;

    function onItemCollapseChange(keyId: any) {
        controller.setNewCollapseKey(keyId);
    }

    const getDaysDiff = (start_date: string, end_date: string, date_format = 'MM/DD/YYYY') => {
        const getDateAsArray = (date: any) => {
            return moment(date.split(/\D+/), date_format);
        };
        return getDateAsArray(end_date).diff(getDateAsArray(start_date), 'days') + 1;
    };

    console.log(controller.company);
    // Render
    return (
        <div className={'job-offers-list'}>
            {controller.company?.isTrial && controller.company?.subscriptions.length === 0 && (
                <div className={'alert-trial-ends'}>
                    <p>
                        {' '}
                        Quedan{' '}
                        {getDaysDiff(
                            moment().format('MM/DD/YYYY'),
                            moment.unix(controller.company?.trialEnd).format('MM/DD/YYYY'),
                        )}{' '}
                        días de free trial.
                    </p>
                </div>
            )}
            {controller.isLoaderVisible ? (
                <div className="offers-collapse-container">
                    <FlexLoader />
                </div>
            ) : controller.errorExist ? (
                <div className="error-message">
                    <h2> {controller.errorMessage}</h2>
                </div>
            ) : controller.company.subscriptions.length === 0 && controller.company.mustUpgrade ? (
                <h2 className="lock-view">
                    {' '}
                    <LockOutlined style={{ fontSize: '30px', color: '#08c' }} /> Para poder usar las funciones de equipo
                    debe solicitar una membresía.
                    <Link to="/subscriptions">
                        <button> Ir a membresías</button>
                    </Link>
                </h2>
            ) : (
                <div>
                    <div className={'action-wrapper'}>
                        <div className={'filter-wrapper'}>
                            {/* <p> {JSON.stringify(controller.checkedID)} </p> */}
                            <p>Filtrar por</p>
                            <Select
                                defaultValue={controller.filter}
                                style={{ width: 160, margin: '0 0 0 1vw' }}
                                onChange={controller.handleSelect}
                            >
                                <Option value="ALL">Todos</Option>
                                <Option value="PUBLISHED">Publicados</Option>
                                <Option value="HIDDEN">Ocultos</Option>
                            </Select>
                        </div>
                        <div className={'filter-wrapper'}>
                            <Select
                                defaultValue="Seleccionar acción"
                                style={{ width: 160 }}
                                onChange={controller.handleSelect}
                            >
                                <Option value="HIDE">Ocultar</Option>
                                <Option value="PUBLISH">Publicar</Option>
                            </Select>
                            <button
                                className={'apply-button-action'}
                                onClick={() => controller.changeJobStatus(controller.action)}
                            >
                                {' '}
                                Aplicar
                            </button>
                        </div>
                    </div>
                    {controller.filter === 'PUBLISHED' ? (
                        <Collapse
                            accordion
                            defaultActiveKey={controller.activeKey}
                            onChange={onItemCollapseChange}
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
                                                        {item.status === 'HIDDEN' && <Tag> Oculto</Tag>}
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
                            onChange={onItemCollapseChange}
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
                                                    {item.status === 'HIDDEN' && <Tag> Oculto</Tag>}{' '}
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
                            onChange={onItemCollapseChange}
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
                                                        {item.status === 'HIDDEN' && <Tag> Oculto</Tag>}
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
