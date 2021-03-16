import React from 'react';
import { NavBar, NavBarProps } from 'components/nav-bar/nav-bar.component';
import { useTranslation } from 'react-i18next/';
import { CompanyOffersFragment } from 'fragments/company-offers/company-offers.fragment';
import { CompanyCardFragment } from 'fragments/company-card/company-card.fragment';

export const CompanyNavigator: React.FC = () => {
    const { t } = useTranslation();

    const CompanyJobsFragment = (
        <div className={'jobs-fragment'}>
            <CompanyOffersFragment />
            <CompanyCardFragment />
        </div>
    );

    const config: NavBarProps = {
        screens: {
            jobs: {
                title: t(['general.company-jobs-title']),
                component: CompanyJobsFragment,
            },
        },
        footer: t(['footer.copyright-message']),
    };

    return <NavBar {...config} />;
};
