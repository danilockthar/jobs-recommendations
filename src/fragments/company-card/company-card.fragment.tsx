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

    return (
        <div className={'relevance-company-data'}>
            <Card style={{ width: '100%', borderRadius: '60px', textAlign: 'center', border: '1px solid #d4d4d4' }}>
                <div className={'card-company-wrapper'}>
                    <div className={'card-company-data-wrapper'}>
                        <h4> {company.name ?? ''}</h4>
                        <p>{controller.subtitle}</p>
                    </div>
                    <button className={'btn-company-data'}> {translate({ key: 'general.update-jobs' })}</button>
                </div>
            </Card>
        </div>
    );
};
