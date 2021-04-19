import React, { useEffect } from 'react';
import 'auth/fragments/register/register.scss';
import { Button, Form, Input, Radio } from 'antd';
import { RegisterFragmentProps } from 'auth/fragments/register/interfaces';
import { useRegisterController } from 'auth/fragments/register/register.controller';
import { Link } from 'react-router-dom';
import { useTranslator } from 'tools/view-hooks/translator-hook';
import { SmileTwoTone } from '@ant-design/icons';

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
                    <img src="companies.png" />
                </div>
            </div>
            <div className="right-login-screen">
                <div className="register-wrapper">
                    <p> {translate({ key: 'auth.have-account?' })} </p>
                    <Link to={'/login'}>
                        <Button>{translate({ key: 'auth.go-to-login-button-label' })}</Button>
                    </Link>
                </div>
                {controller.hasToConfirmEmail ? (
                    <div className={'has-to-confirm-wrapper'}>
                        <SmileTwoTone style={{ fontSize: '30px', textAlign: 'center' }} />
                        <h1>{translate({ key: 'auth.register-success' })}</h1>
                        <p> {translate({ key: 'auth.email-verification-sended' })} </p>
                    </div>
                ) : (
                    <Form name="basic" initialValues={{ remember: true }} onFinish={controller.onRegisterSubmit}>
                        <div className={'title-register'}>
                            <h2> {translate({ key: 'auth.register-title' })} </h2>
                            <p>{controller.subtitle}</p>
                        </div>
                        <div className={'wrapper-input-name'}>
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
                        </div>
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
                        <Button type="primary" block={true} htmlType="submit" loading={controller.isLoading}>
                            {translate({ key: 'auth.register-button-label' })}
                        </Button>
                    </Form>
                )}
            </div>
        </div>
    );
};
