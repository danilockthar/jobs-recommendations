import React from 'react';
import 'components/simple-item-view/simple-item-view.scss';
import { Space, Typography } from 'antd';

export interface SimpleItemViewProps {
    title: string;
    subtitle?: string;
}

const SimpleItemView: React.FC<SimpleItemViewProps> = (props) => {
    return (
        <div className={'simple-item-view'}>
            <Space direction={'vertical'} size={0}>
                <Typography.Text strong>{props.title}</Typography.Text>
                {props.subtitle ? <Typography.Text type={'secondary'}>{props.subtitle}</Typography.Text> : null}
            </Space>
        </div>
    );
};

export default SimpleItemView;
