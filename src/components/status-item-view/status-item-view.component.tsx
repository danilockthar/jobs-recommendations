import React from 'react';
import 'components/status-item-view/status-item-view.scss';
import { Tag } from 'antd';

export type StatusItemViewProps = {
    label: string;
    color?: string;
};

const StatusItemView: React.FC<StatusItemViewProps> = (props) => {
    return (
        <div className={'status-item-view'}>
            <Tag color={props.color}>{props.label}</Tag>
        </div>
    );
};

export default StatusItemView;
