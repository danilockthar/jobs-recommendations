import React from 'react';
import 'fragments/company-card/company-card.scss';
import { CompanyCardFragmentProps } from 'fragments/company-card/interfaces';
import { Card } from 'antd';
import { useCompanyCardController } from 'fragments/company-card/company-card.controller';
import { useTranslation } from 'react-i18next/';
import FlexLoader from 'components/flex-loader/flex-loader.component';
import { useLocalSession } from 'auth/helpers/session.hooks';

export const CompanyCardFragment: React.FC<CompanyCardFragmentProps> = (props) => {
    const { useController = useCompanyCardController } = props;
    const controller = useController();
    const [getSession] = useLocalSession();
    const session = getSession();

    const { t } = useTranslation();
    const redirectURL = encodeURI(process.env.REACT_APP_BASE_URL ?? '');
    // Render
    return (
        <div className={'relevance-user-data'}>
            <Card style={{ width: '100%', borderRadius: '10px', textAlign: 'center', border: '1px solid #d4d4d4' }}>
                <h2>{'Compania'}</h2>
                {controller.isLoaderVisible ? (
                    <FlexLoader />
                ) : controller.company && controller.company.id ? (
                    <React.Fragment>
                        <img className="image-profile" src={controller.company.logoUrl} />
                        <h3>{controller.company.name}</h3>
                        <p>{controller.company.websiteUrl}</p>
                        <p>{controller.company.membershipType}</p>
                        {session.isAuthenticated() ? (
                            <>
                                <button onClick={() => window.open('https://www.linkedin.com/in/', '_blank')}>
                                    {' '}
                                    {t(['general.linkedInModifyButton'])}
                                </button>
                                <button onClick={controller.desvinculateLinkedin} className={'button-desvinculate'}>
                                    {' '}
                                    {t(['general.linkedinDesvinculate'])}
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={() =>
                                    window.open(
                                        `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=77zjvguy2u0drs&redirect_uri=${redirectURL}%2Fauth%2Flinkedin&scope=r_liteprofile%20r_emailaddress%20`,
                                        '_self',
                                    )
                                }
                            >
                                {t(['general.connectWithLinkedin'])}
                            </button>
                        )}
                    </React.Fragment>
                ) : (
                    ''
                )}
            </Card>
        </div>
    );
};
