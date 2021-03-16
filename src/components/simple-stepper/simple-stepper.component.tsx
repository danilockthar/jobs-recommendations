import React, { ReactNode, useState } from 'react';
import 'components/simple-stepper/simple-stepper.scss';
import { Button, Divider, Layout, Row, Space, Typography } from 'antd';

export interface SimpleStepperProps {
    steps: {
        title?: string;
        description?: string;
        component: ReactNode;
        isValid: boolean;
    }[];
    previousButtonLabel: string;
    nextButtonLabel: string;
    lastButtonLabel: string;
    onFinished: () => void;
}

const SimpleStepper: React.FC<SimpleStepperProps> = (props) => {
    // State
    const [currentStepIndex, setCurrentStepIndex] = useState(0);

    const { Title, Text } = Typography;
    const currentStep = props.steps[currentStepIndex];
    const nextButtonText = currentStepIndex < props.steps.length - 1 ? props.nextButtonLabel : props.lastButtonLabel;

    const moveForward = () => {
        const nexStepIndex = currentStepIndex + 1;
        if (nexStepIndex < props.steps.length) {
            setCurrentStepIndex(nexStepIndex);
        } else if (nexStepIndex === props.steps.length) {
            props.onFinished();
        }
    };

    const moveBackwards = () => {
        const nexStepIndex = currentStepIndex - 1;
        if (nexStepIndex >= 0) {
            setCurrentStepIndex(nexStepIndex);
        }
    };

    return (
        <Layout className={'simple-stepper'}>
            {currentStep.title ? <Title>{currentStep.title}</Title> : null}
            {currentStep.description ? <Text>{currentStep.description}</Text> : null}
            {currentStep.description || currentStep.title ? <Divider /> : null}

            {currentStep.component}

            <Row justify={'end'} className={'step-navigator'}>
                <Space>
                    {currentStepIndex !== 0 ? (
                        <Button onClick={moveBackwards}>{props.previousButtonLabel}</Button>
                    ) : null}

                    <Button disabled={!currentStep.isValid} type={'primary'} onClick={moveForward}>
                        {nextButtonText}
                    </Button>
                </Space>
            </Row>
        </Layout>
    );
};

export default SimpleStepper;
