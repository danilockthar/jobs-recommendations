/* eslint-disable */
import React, { ReactNode, useState } from 'react';
import 'components/sider-nav-navigation/sider-nav-navigation.scss';
import { Layout, Menu, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Content } from 'antd/es/layout/layout';

export interface SiderNavNavigationProps {
    component?: ReactNode;
}

const SiderNavNavigation: React.FC<SiderNavNavigationProps> = (props) => {
    // State
    const [count, setCount] = useState(false);

    const { Header, Sider } = Layout;

    return (
        <Layout className="sider-nav-navigation">
            <Header className="header" style={{ paddingLeft: '10px', backgroundColor: '#9A5DCF' }}>
                <Avatar size={50} icon={<UserOutlined />} />
            </Header>
            <Layout>
                <Sider breakpoint="lg" collapsedWidth="0" width="200" className="site-layout-background">
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{ height: '100%' }}
                    >
                        <Menu.Item key="1">Inicio</Menu.Item>
                        <Menu.Item key="2">Personas</Menu.Item>
                        <Menu.Item key="3">Propiedades</Menu.Item>
                        <Menu.Item key="4">Contratos</Menu.Item>
                    </Menu>
                </Sider>
                {props.component}
            </Layout>
        </Layout>
    );
};

export default SiderNavNavigation;
