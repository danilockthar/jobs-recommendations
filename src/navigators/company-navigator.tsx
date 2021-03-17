import React, { useState } from 'react';
import { NavBar, NavBarProps } from 'components/nav-bar/nav-bar.component';
import { useTranslation } from 'react-i18next/';
import { CompanyOffersFragment } from 'fragments/company-offers/company-offers.fragment';
import { CompanyCardFragment } from 'fragments/company-card/company-card.fragment';
import { LinkedInJobsContext } from 'services/linkedin/linked-in-jobs.context';
import { LinkedInJobDto } from 'services/linkedin/dtos/linked-in-job.dto';

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
