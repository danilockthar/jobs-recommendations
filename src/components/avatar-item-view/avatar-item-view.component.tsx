import React from 'react';
import 'components/avatar-item-view/avatar-item-view.scss';
import { Avatar, Space } from 'antd';
import SimpleItemView, { SimpleItemViewProps } from 'components/simple-item-view/simple-item-view.component';

export interface AvatarItemViewProps extends SimpleItemViewProps {
    avatarURL?: string;
}

const AvatarItemView: React.FC<AvatarItemViewProps> = (props) => {
    return (
        <Space className={'avatar-item-view'}>
            <Avatar src={props.avatarURL} size={'large'}>
                {props.title
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
            </Avatar>
            <SimpleItemView title={props.title} subtitle={props.subtitle} />
        </Space>
    );
};

export default AvatarItemView;
