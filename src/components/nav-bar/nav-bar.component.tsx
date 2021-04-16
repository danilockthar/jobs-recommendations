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
    const [trialMsg, setTrialMsg] = useState('');
    const session = getSession();

    const { company } = useContext(SessionContext);

    console.log(company, 'inital company');

    useEffect(() => {
        if (company?.isTrial && company?.subscriptions.length === 0) {
            const msg = `Tu período de prueba vence el ${moment
                .unix(company?.trialEnd)
                .format(
                    'DD/MM/YYYY',
                )}. Deberas contratar una membresía previamente a esa fecha para continuar usando la plataforma.`;
            // const msg = `Quedan ${getDaysDiff(
            //     moment().format('MM/DD/YYYY'),
            //     moment.unix(company?.trialEnd).format('MM/DD/YYYY'),
            // )} días de período de prueba.`;
            setTrialMsg(msg);
        }
    }, [company]);

    const queryparams = useParams();

    const getDaysDiff = (start_date: string, end_date: string, date_format = 'MM/DD/YYYY') => {
        const getDateAsArray = (date: any) => {
            return moment(date.split(/\D+/), date_format);
        };
        return getDateAsArray(end_date).diff(getDateAsArray(start_date), 'days') + 1;
    };

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
                                        <p>{trialMsg}</p>
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
