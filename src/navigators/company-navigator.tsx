import React, { useEffect, useState } from 'react';
import { NavBar, NavBarProps } from 'components/nav-bar/nav-bar.component';
import { useTranslation } from 'react-i18next/';
import { CompanyOffersFragment } from 'fragments/company-offers/company-offers.fragment';
import { CompanyCardFragment } from 'fragments/company-card/company-card.fragment';
import { LinkedInJobsContext } from 'services/linkedin/linked-in-jobs.context';
import { LinkedInJobDto } from 'services/linkedin/dtos/linked-in-job.dto';
import { MembershipViewFragment } from 'fragments/membership-view/membership-view.fragment';
import { TeamFragmentFragment } from 'fragments/team-fragment/team-fragment.fragment';
import { CompanyDto, useAPICompanyService } from 'services/company/company.service';

export const CompanyNavigator: React.FC = () => {
    const { t } = useTranslation();
    const [jobs, setJobs] = useState<LinkedInJobDto[]>([]);
    const [company, setCompany] = useState<any>({ mustUpgrade: false });

    const companyService = useAPICompanyService();

    useEffect(() => {
        const fetchData = async () => {
            companyService
                .getCompany()
                .then((output) => {
                    if (output) {
                        setCompany(output);
                    }
                })
                .catch((err) => {
                    switch (err.response.data.code) {
                        case 'subscription_canceled':
                            setCompany(err.response.data.company);
                            break;

                        default:
                            break;
                    }
                });
        };
        fetchData();
    }, []);

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
        screens: company?.mustUpgrade
            ? {
                  subscriptions: {
                      title: t(['general.company-subscriptions']),
                      component: MembershipFragment,
                  },
              }
            : {
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

    // const config: NavBarProps = {
    //     screens: {
    //         jobs: {
    //             title: t(['general.company-jobs-title']),
    //             component: CompanyJobsFragment,
    //         },
    //         subscriptions: {
    //             title: t(['general.company-subscriptions']),
    //             component: MembershipFragment,
    //         },
    //         team: {
    //             title: t(['general.company-team']),
    //             component: <TeamFragmentFragment />,
    //         },
    //     },
    //     footer: t(['footer.copyright-message']),
    // };

    return <NavBar {...config} />;
};
