import React from 'react';
import 'components/space-card/space-card.scss';
import { Card, Image, Tag, Typography } from 'antd';
import { CardProps } from 'antd/lib/card';

export interface SpaceCardProps extends CardProps {
    tagLabel: string;
    tagColor: string;
    imageURL: string;
    title: string;
}

const SpaceCard: React.FC<SpaceCardProps> = (props) => {
    const { tagLabel, tagColor, imageURL, title, ...cardProps } = props;
    const cardWidth = 300;

    const Cover = (
        <div className={'cover'}>
            <Image preview={false} width={cardWidth} height={180} src={imageURL} />
            <Tag color={tagColor}>{tagLabel}</Tag>
        </div>
    );

    return (
        <Card className={'space-card'} style={{ width: cardWidth }} cover={Cover} {...cardProps}>
            <Typography.Title level={3}>{title}</Typography.Title>
        </Card>
    );
};

export default SpaceCard;
