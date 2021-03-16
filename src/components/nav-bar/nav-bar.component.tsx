import React, { ReactNode } from 'react';
import 'components/nav-bar/nav-bar.scss';
import { Switch, Route, Link, Redirect, useRouteMatch } from 'react-router-dom';
import { Avatar, Layout, Menu } from 'antd';
import ButtonLogout from 'auth/components/button-logout/button-logout.component';
import { NavBarDropdown } from 'components/nav-bar-dropdown/nav-bar-dropdown.component';

export interface TopBarScreen {
    title: string;
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

    const AvatarDropdown = (
        <NavBarDropdown className={'avatar-dropdown'} menuItemsChildren={[<ButtonLogout key={'logout'} />]}>
            <Avatar size={'large'} src={''} />
        </NavBarDropdown>
    );

    const HorizontalMenu = (
        <Menu selectedKeys={[firstPath]} mode="horizontal">
            {Object.keys(props.screens).map((screenKey) => {
                const screen = props.screens[screenKey];
                return (
                    <Menu.Item key={screenKey}>
                        <Link to={'/' + screenKey}> {screen.title} </Link>
                    </Menu.Item>
                );
            })}
        </Menu>
    );

    const ScreenSwitcher = (
        <Switch>
            {Object.keys(props.screens).map((screenKey) => {
                const screen = props.screens[screenKey];
                return (
                    <Route key={screenKey} path={'/' + screenKey}>
                        {screen.component}
                    </Route>
                );
            })}
            <Route key={'/'}>
                <Redirect to={'/' + Object.keys(props.screens)[0]} />
            </Route>
        </Switch>
    );

    return (
        <Layout className={'nav-bar'}>
            <Layout.Header>
                <div className={'header'}>
                    {AvatarDropdown}
                    {HorizontalMenu}
                </div>
            </Layout.Header>

            <Layout.Content>{ScreenSwitcher}</Layout.Content>

            <Layout.Footer className={'footer'}>{props.footer}</Layout.Footer>
        </Layout>
    );
};
