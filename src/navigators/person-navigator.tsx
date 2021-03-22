import React from 'react';
import { NavBar, NavBarProps } from 'components/nav-bar/nav-bar.component';
import { useTranslation } from 'react-i18next/';
import { OffersListFragment } from 'fragments/offers-list/offers-list.fragment';
import { RelevanceCardFragment } from 'fragments/relevance-card/relevance-card.fragment';
import { RecommendedJobsFragmentFragment } from 'fragments/recommended-jobs-fragment/recommended-jobs-fragment.fragment';
import { Switch, Route } from 'react-router';
export const PersonNavigator: React.FC = () => {
    const { t } = useTranslation();

    const PersonJobsFragment = (
        <Switch>
            <Route path={'/jobs/:id'}>
                <h1>detalle</h1>
            </Route>
            <Route>
                <div className={'jobs-fragment'}>
                    <OffersListFragment />
                    <RelevanceCardFragment />
                </div>
            </Route>
        </Switch>
    );

    const PersonRecommendenFragment = (
        <div className={'referred-jobs-fragment'}>
            <RecommendedJobsFragmentFragment />
        </div>
    );

    const AppliedJob = <div className={'applied-job'}></div>;

    const config: NavBarProps = {
        screens: {
            jobs: {
                title: t(['general.person-jobs-title']),
                component: PersonJobsFragment,
            },
            referred: {
                title: t(['general.referred-title']),
                component: PersonRecommendenFragment,
            },
        },
        footer: t(['footer.copyright-message']),
    };

    return <NavBar {...config} />;
};
