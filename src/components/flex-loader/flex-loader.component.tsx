import React from 'react';
import { Layout, Spin } from 'antd';
import 'components/flex-loader/flex-loader.scss';

const FlexLoader: React.FC = () => {
    return (
        <div className={'flex-loader'}>
            <Layout>
                <Spin />
            </Layout>
        </div>
    );
};

export default FlexLoader;
