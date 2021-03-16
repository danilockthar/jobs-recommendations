import React from 'react';
import { NavBar, NavBarProps } from 'components/nav-bar/nav-bar.component';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import { CheckCircleOutlined, CalendarOutlined } from '@ant-design/icons';
import LeftSider from 'components/left-sider/left-sider.component';
import { useTranslator } from 'tools/view-hooks/translator-hook';
import { Space } from 'antd';

export default function ExampleNavBar(): JSX.Element {
    const translator = useTranslator();

    const ExampleStack = (
        <Switch>
            <Route exact path={'/stackExample'}>
                <Space style={{ backgroundColor: 'lightgray', flex: 1, justifyContent: 'center' }}>
                    <div>Example</div>
                    <Link to={'/stackExample/12'}>Go to Detail</Link>
                </Space>
            </Route>
            <Route path={`/stackExample/:id`}>
                <Space style={{ backgroundColor: 'lightgray', flex: 1, justifyContent: 'center' }}>
                    <div>Example Detail</div>
                    <Link to={'/stackExample'}>Go back</Link>
                </Space>
            </Route>
            <Route>
                <Redirect to={'/stackExample'} />
            </Route>
        </Switch>
    );

    const LeftSiderExample = (
        <LeftSider
            options={{
                one: {
                    title: 'one',
                    component: <div>One</div>,
                    icon: <CalendarOutlined />,
                },
                two: {
                    title: 'two',
                    component: <div>Two</div>,
                    icon: <CheckCircleOutlined />,
                },
            }}
        />
    );

    const config: NavBarProps = {
        screens: {
            stackExample: {
                title: 'Stack Example',
                component: ExampleStack,
            },
            leftSiderExample: {
                title: 'LeftSider Example',
                component: LeftSiderExample,
            },
            fullFragmentExample: {
                title: 'Full Fragment',
                component: (
                    <Space style={{ backgroundColor: 'lightgray', flex: 1, justifyContent: 'center' }}>
                        <div>Full Fragment Example</div>
                    </Space>
                ),
            },
        },
        footer: translator.translate({ key: 'footer.copyright-message' }),
    };

    return <NavBar {...config} />;
}
