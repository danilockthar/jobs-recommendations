import React from 'react';
import 'fragments/on-boarding/on-boarding.scss';
import { OnBoardingFragmentProps } from 'fragments/on-boarding/interfaces';
import { useOnBoardingController } from 'fragments/on-boarding/on-boarding.controller';
import { Form, Input, Button } from 'antd';
import { useTranslator } from 'tools/view-hooks/translator-hook';

export const OnBoardingFragment: React.FC<OnBoardingFragmentProps> = (props) => {
    const { useController = useOnBoardingController } = props;
    const controller = useController();
    const { translate } = useTranslator();

    return (
        <div className={'on-boarding'}>
            <div className={'wrapper-panel'}>
                <div className={'introduction-onboard'}>
                    <h1>Quiero Contratar.</h1>
                    <p>
                        {' '}
                        Serás el administrador de la cuenta de tu organización. Podrás invitar a otros colaboradores a
                        trabajar contigo en la plataforma de FunkeyUp.{' '}
                    </p>
                </div>
                <div className={'inputs-onboard'}>
                    <Form name="basic" initialValues={{ remember: true }} onFinish={controller.onOnboardingSubmit}>
                        <Form.Item
                            label={translate({ key: 'onBoarding.name-organization' })}
                            name="name"
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label={translate({ key: 'onBoarding.linkedin-organization-url' })}
                            name="linkedInCompanyUrl"
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </Form.Item>
                        <p className={'linkedin-note'}>
                            {' '}
                            *Buscaremos los trabajos de tu organización para publicarlos en FunkeyUp asi podrás empezar
                            a recibir recomendaciones de candidatos.
                        </p>
                        <Button type="primary" block={true} htmlType="submit" loading={controller.isLoading}>
                            {translate({ key: 'onBoarding.start-organization' })}
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    );
};
