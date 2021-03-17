import React from 'react';
import 'auth/fragments/register/register.scss';
import { Button, Form, Input, Radio } from 'antd';
import { RegisterFragmentProps } from 'auth/fragments/register/interfaces';
import { useRegisterController } from 'auth/fragments/register/register.controller';
import { Link } from 'react-router-dom';
import { useTranslator } from 'tools/view-hooks/translator-hook';

export const RegisterFragment: React.FC<RegisterFragmentProps> = (props) => {
    const { useController = useRegisterController } = props;
    const controller = useController();
    const { translate } = useTranslator();

    // Render
    return (
        <div className={'register'}>
            <div className="left-login-screen">
                <div className="text-left">
                    <p> InVision Enterprise Edition</p>
                    <h2> The design collaboration cloud for larger teams</h2>
                    <h3>Unlimited team members. Unlimited projects. Unlimited creativity.</h3>
                    <p>TRUSTED BY THE WORLD’S SMARTEST COMPANIES</p>
                    <img src="https://daniarroyo.now.sh/companies.png" />
                </div>
            </div>
            <div className="right-login-screen">
                <div className="register-wrapper">
                    <p> ¿Ya tienes una cuenta?</p>
                    <Link to={'/login'}>
                        <Button>{translate({ key: 'auth.go-to-login-button-label' })}</Button>
                    </Link>
                </div>

                <Form name="basic" initialValues={{ remember: true }} onFinish={controller.onRegisterSubmit}>
                    <Form.Item
                        label={translate({ key: 'auth.first-name-input-label' })}
                        name="firstName"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label={translate({ key: 'auth.last-name-input-label' })}
                        name="lastName"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label={translate({ key: 'auth.email-input-label' })}
                        name="email"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label={translate({ key: 'auth.password-input-label' })}
                        name="password"
                        rules={[{ required: true }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        label={translate({ key: 'auth.role-input-label' })}
                        name="role"
                        rules={[{ required: true }]}
                    >
                        <Radio.Group>
                            <Radio.Button value="company">Company</Radio.Button>
                            <Radio.Button value="person">Persona</Radio.Button>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" block={true} htmlType="submit" loading={controller.isLoading}>
                            {translate({ key: 'auth.register-button-label' })}
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};
