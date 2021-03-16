import React, { ReactNode } from 'react';
import 'components/left-sider/left-sider.scss';
import { Layout, Menu } from 'antd';
import { Link, Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';

export interface LeftSiderProps {
    options: { [key: string]: { title: string; component: ReactNode; icon: ReactNode } };
    siderWith?: number;
}

const LeftSider: React.FC<LeftSiderProps> = (props) => {
    // Hooks
    const match = useRouteMatch();
    const path = match.path == '/' ? '' : match.path;
    const url = match.url == '/' ? '' : match.url;
    const optionMatch = useRouteMatch(`${url}/:selectedOption`);
    // eslint-disable-next-line
    const options: any = optionMatch?.params ?? '/';

    const { Content, Sider } = Layout;

    const OptionSwitcher = (
        <Switch>
            {Object.keys(props.options).map((optionKey) => {
                const option = props.options[optionKey];
                return (
                    <Route key={optionKey} path={`${path}/${optionKey}`}>
                        {option.component}
                    </Route>
                );
            })}
            <Route key={'/'}>
                <Redirect to={`${path}/${Object.keys(props.options)[0]}`} />
            </Route>
        </Switch>
    );

    return (
        <Layout className={'left-sider'}>
            <Sider breakpoint="lg" collapsedWidth="0" width={props.siderWith}>
                <Menu selectedKeys={[options.selectedOption]}>
                    {Object.keys(props.options).map((optionKey) => {
                        const option = props.options[optionKey];
                        return (
                            <Menu.Item key={optionKey} icon={option.icon}>
                                <Link to={`${url}/${optionKey}`}> {option.title} </Link>
                            </Menu.Item>
                        );
                    })}
                </Menu>
            </Sider>

            {/* <Layout> */}
            <Content>{OptionSwitcher}</Content>
            {/* </Layout> */}
        </Layout>
    );
};

export default LeftSider;
