import React from 'react';
import 'auth/fragments/login/login.scss';
import { LoginFragmentProps } from 'auth/fragments/login/interfaces';
import { useLoginController } from 'auth/fragments/login/login.controller';
import { Button, Form, Input } from 'antd';
import { Link } from 'react-router-dom';
import ModalForm from 'components/modal-form/modal-form.component';
import { useTranslator } from 'tools/view-hooks/translator-hook';

export const LoginFragment: React.FC<LoginFragmentProps> = (props) => {
    const { useController = useLoginController } = props;
    const controller = useController();
    const { translate } = useTranslator();

    // Render
    return (
        <div className={'login'}>
            <ModalForm
                form={controller.recoverPassForm}
                isVisible={controller.isRecoverPassVisible}
                isLoading={controller.isRecoverPassLoading}
                onFinish={controller.onRecoverPassSubmit}
                onCancel={controller.onCancelRecoverPass}
                title={translate({ key: 'auth.recover-password-title' })}
            >
                <Form.Item
                    label={translate({ key: 'auth.email-input-label' })}
                    name="email"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
            </ModalForm>
            <Form name="basic" initialValues={{ remember: true }} onFinish={controller.onLoginSubmit}>
                <Form.Item
                    label={translate({ key: 'auth.email-input-label' })}
                    name="username"
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

                <Form.Item>
                    <Button type="primary" block={true} htmlType="submit" loading={controller.isLoading}>
                        {translate({ key: 'auth.login-button-label' })}
                    </Button>
                </Form.Item>
            </Form>
            <Link to={'/register'}>
                <Button> {translate({ key: 'auth.go-to-register-button-label' })}</Button>
            </Link>
            <Button type={'link'} onClick={controller.onForgotPassPressed}>
                {translate({ key: 'auth.forgot-password-button-label' })}
            </Button>
        </div>
    );
};
