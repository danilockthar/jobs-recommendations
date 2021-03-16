import React from 'react';
import 'auth/fragments/reset-password/reset-password.scss';
import { Button, Form, Input } from 'antd';
import { ResetPasswordFragmentProps } from 'auth/fragments/reset-password/interfaces';
import { Link } from 'react-router-dom';
import { useResetPasswordController } from 'auth/fragments/reset-password/reset-password.controller';
import { useTranslator } from 'tools/view-hooks/translator-hook';

export const ResetPasswordFragment: React.FC<ResetPasswordFragmentProps> = (props) => {
    const { useController = useResetPasswordController } = props;
    const controller = useController();
    const { translate } = useTranslator();

    // Render
    return (
        <div className={'reset-password'}>
            <Form name="basic" initialValues={{ remember: true }} onFinish={controller.onResetPasswordSubmit}>
                <Form.Item
                    label={translate({ key: 'auth.password-input-label' })}
                    name="password"
                    rules={[{ required: true }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label={translate({ key: 'auth.repeat-password-input-label' })}
                    name="repeat-password"
                    rules={[{ required: true }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" block={true} htmlType="submit" loading={controller.isLoading}>
                        {translate({ key: 'auth.reset-password-button-babel' })}
                    </Button>
                </Form.Item>
            </Form>
            <Link to={'/login'}>
                <Button>{translate({ key: 'auth.go-to-login-button-label' })}</Button>
            </Link>
        </div>
    );
};
