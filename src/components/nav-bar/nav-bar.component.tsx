import React, { ReactNode } from 'react';
import 'components/nav-bar/nav-bar.scss';
import { Switch, Route, Link, Redirect, useRouteMatch, useParams } from 'react-router-dom';
import { Avatar, Layout } from 'antd';
import { NavBarDropdown } from 'components/nav-bar-dropdown/nav-bar-dropdown.component';
import { useLocalSession } from 'auth/helpers/session.hooks';
import ButtonLogout from 'auth/components/button-logout/button-logout.component';

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
    const [getSession] = useLocalSession();
    const session = getSession();

    const queryparams = useParams();

    const AvatarDropdown = (
        <NavBarDropdown className={'avatar-dropdown'} menuItemsChildren={[<ButtonLogout key={'logout'} />]}>
            <Avatar size={'large'} src={'logo-placeholder.png'} />
        </NavBarDropdown>
    );

    // const HorizontalMenu = (
    //     <Menu selectedKeys={[firstPath]} mode="horizontal">
    //         {Object.keys(props.screens).map((screenKey) => {
    //             const screen = props.screens[screenKey];
    //             return (
    //                 <Menu.Item key={screenKey}>
    //                     <Link to={'/' + screenKey}> {screen.title} </Link>
    //                 </Menu.Item>
    //             );
    //         })}
    //     </Menu>
    // );

    const NavMenu = (
        <div className="menu_nav_">
            {Object.keys(props.screens).map((screenKey) => {
                const screen = props.screens[screenKey];
                return (
                    <Link key={screenKey} to={'/' + screenKey}>
                        {' '}
                        {screen.title}{' '}
                    </Link>
                );
            })}
        </div>
    );

    // const ScreenSwitcher = (
    //     <Switch>
    //         <Route path={'/auth/linkedin/'}></Route>
    //         {Object.keys(props.screens).map((screenKey) => {
    //             const screen = props.screens[screenKey];
    //             return (
    //                 <Route key={screenKey} path={'/' + screenKey}>
    //                     {screen.component}
    //                 </Route>
    //             );
    //         })}
    //         <Route key={'/'}>
    //             <Redirect to={'/' + Object.keys(props.screens)[0]} />
    //         </Route>
    //     </Switch>
    // );

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
                                    {NavMenu}
                                    {AvatarDropdown}
                                </div>
                            </Layout.Header>
                            <Layout.Content>{screen.component}</Layout.Content>
                            <Layout.Footer className={'footer'}>{props.footer}</Layout.Footer>
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
