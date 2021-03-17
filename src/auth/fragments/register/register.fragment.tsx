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
                <img className="image-logo" src={'funkeyup_logo.png'} />
                <div className="text-left">
                    <p>Social HeadHunting</p>
                    <h2>Where we all are Headhunters</h2>
                    <h3>
                        We are the first platform that allows you to refer a friend or colleague to a job search related
                        to your profile and professional expertise.
                    </h3>
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
                            <Radio.Button value="company">Organización</Radio.Button>
                            <Radio.Button value="person">Individuo</Radio.Button>
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
