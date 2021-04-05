import React, { useState } from 'react';
import { NavBar, NavBarProps } from 'components/nav-bar/nav-bar.component';
import { useTranslation } from 'react-i18next/';
import { CompanyOffersFragment } from 'fragments/company-offers/company-offers.fragment';
import { CompanyCardFragment } from 'fragments/company-card/company-card.fragment';
import { LinkedInJobsContext } from 'services/linkedin/linked-in-jobs.context';
import { LinkedInJobDto } from 'services/linkedin/dtos/linked-in-job.dto';
import { MembershipViewFragment } from 'fragments/membership-view/membership-view.fragment';
import { TeamFragmentFragment } from 'fragments/team-fragment/team-fragment.fragment';

export const CompanyNavigator: React.FC = () => {
    const { t } = useTranslation();
    const [jobs, setJobs] = useState<LinkedInJobDto[]>([]);

    const CompanyJobsFragment = (
        <LinkedInJobsContext.Provider value={{ jobs, setJobs }}>
            <div className={'jobs-fragment'}>
                <CompanyOffersFragment />
                <CompanyCardFragment />
            </div>
        </LinkedInJobsContext.Provider>
    );

    const MembershipFragment = (
        <div className={'subscription-fragment'}>
            <MembershipViewFragment />
        </div>
    );

    const config: NavBarProps = {
        screens: {
            jobs: {
                title: t(['general.company-jobs-title']),
                component: CompanyJobsFragment,
            },
            subscriptions: {
                title: t(['general.company-subscriptions']),
                component: MembershipFragment,
            },
            team: {
                title: t(['general.company-team']),
                component: <TeamFragmentFragment />,
            },
        },
        footer: t(['footer.copyright-message']),
    };

    return <NavBar {...config} />;
};
