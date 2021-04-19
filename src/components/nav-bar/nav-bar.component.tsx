import React, { ReactNode, useContext, useEffect, useState } from 'react';
import 'components/nav-bar/nav-bar.scss';
import { Switch, Route, Link, Redirect, useRouteMatch, useParams, NavLink } from 'react-router-dom';
import { Avatar, Layout } from 'antd';
import { NavBarDropdown } from 'components/nav-bar-dropdown/nav-bar-dropdown.component';
import { useLocalSession } from 'auth/helpers/session.hooks';
import ButtonLogout from 'auth/components/button-logout/button-logout.component';
import { SessionContext } from 'auth/helpers/session.context';
import moment from 'moment';
import { OnBoardingFragment } from 'fragments/on-boarding/on-boarding.fragment';
import { useTranslator } from 'tools/view-hooks/translator-hook';

export interface TopBarScreen {
    title: string;
    icon?: ReactNode;
    component: ReactNode;
}

export interface NavBarProps {
    screens: { [key: string]: TopBarScreen };
    footer: string;
}

export const NavBar: React.FC<NavBarProps> = (props) => {
    const firstPathMatch = useRouteMatch('/:first');
    const firstRestPathMatch = useRouteMatch('/:first/:rest');
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    const params: any = firstPathMatch ? firstPathMatch.params : firstRestPathMatch?.params;
    const firstPath = params?.first;
    const [getSession] = useLocalSession();
    const { translate } = useTranslator();
    const [trialDate, setTrialDate] = useState('');

    const { company } = useContext(SessionContext);
    console.log(company, 'ct');

    useEffect(() => {
        if (company?.isTrial && company?.subscriptions.length === 0) {
            setTrialDate(moment.unix(company?.trialEnd).format('DD/MM/YYYY'));
        }
    }, [company]);

    const AvatarDropdown = (
        <NavBarDropdown className={'avatar-dropdown'} menuItemsChildren={[<ButtonLogout key={'logout'} />]}>
            <Avatar size={'large'} src={'/placeholder.jpg'} />
        </NavBarDropdown>
    );

    const NavMenu = (
        <div className="menu_nav_">
            {Object.keys(props.screens).map((screenKey) => {
                const screen = props.screens[screenKey];
                return (
                    <NavLink activeClassName="selected" key={screenKey} to={'/' + screenKey}>
                        {' '}
                        {screen.icon && screen.icon}
                        {screen.title}{' '}
                    </NavLink>
                );
            })}
        </div>
    );

    return (
        <Switch>
            {Object.keys(props.screens).map((screenKey) => {
                const screen = props.screens[screenKey];
                return (
                    <Route key={screenKey} path={'/' + screenKey}>
                        <Layout className={'nav-bar'}>
                            <Layout.Header>
                                <div className={'header'}>
                                    <img className={'logo-header'} src="/img_logo_funkeyup_white.png" />
                                    <div></div>
                                    {AvatarDropdown}
                                </div>
                                {company?.isTrial && company?.subscriptions.length === 0 && (
                                    <div className={'alert-trial-ends'}>
                                        <p>
                                            {translate({
                                                key: 'general.trial-period-message',
                                                extra: { dateString: trialDate },
                                            })}
                                        </p>
                                    </div>
                                )}
                            </Layout.Header>
                            {company && company.name !== null && <Layout className={'side-menu'}>{NavMenu}</Layout>}

                            <Layout.Content>
                                {company && company.name !== null ? screen.component : <OnBoardingFragment />}
                            </Layout.Content>
                        </Layout>
                    </Route>
                );
            })}
            <Route key={'/as'} path="/as/:id">
                <h1> asd</h1>
            </Route>
            <Route key={'/'}>
                <Redirect to={'/' + Object.keys(props.screens)[0]} />
            </Route>
        </Switch>
    );
};
