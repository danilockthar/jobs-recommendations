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

                <Form.Item label={translate({ key: 'auth.role-input-label' })} name="role" rules={[{ required: true }]}>
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
            <Link to={'/login'}>
                <Button>{translate({ key: 'auth.go-to-login-button-label' })}</Button>
            </Link>
        </div>
    );
};
