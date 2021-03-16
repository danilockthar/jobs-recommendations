import React from 'react';
import { NavBar, NavBarProps } from 'components/nav-bar/nav-bar.component';
import { useTranslation } from 'react-i18next/';
import { OffersListFragment } from 'fragments/offers-list/offers-list.fragment';
import { RelevanceCardFragment } from 'fragments/relevance-card/relevance-card.fragment';

export const PersonNavigator: React.FC = () => {
    const { t } = useTranslation();

    const PersonJobsFragment = (
        <div className={'jobs-fragment'}>
            <OffersListFragment />
            <RelevanceCardFragment />
        </div>
    );

    const config: NavBarProps = {
        screens: {
            jobs: {
                title: t(['general.person-jobs-title']),
                component: PersonJobsFragment,
            },
        },
        footer: t(['footer.copyright-message']),
    };

    return <NavBar {...config} />;
};
