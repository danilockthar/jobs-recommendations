import React from 'react';
import 'components/switch-row/switch-row.scss';
import { Col, Row, Switch, Typography } from 'antd';
import { SwitchProps } from 'antd/lib/switch';

export interface SwitchRowProps extends SwitchProps {
    label: string;
    statusLabel?: string;
}

const SwitchRow: React.FC<SwitchRowProps> = (props) => {
    return (
        <div className={'switch-row'}>
            <Row>
                <Col className={'label-col'} span={18}>
                    <Typography.Text>{props.label}</Typography.Text>
                </Col>
                <Col className={'switch-col'} span={6}>
                    <Switch {...props} />
                    {props.statusLabel ? <Typography.Text> {props.statusLabel} </Typography.Text> : null}
                </Col>
            </Row>
        </div>
    );
};

export default SwitchRow;
