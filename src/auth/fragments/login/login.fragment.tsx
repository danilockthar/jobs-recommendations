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
                    <p> ¿No tienes una cuenta?</p>
                    <Link to={'/register'}>
                        <Button> {translate({ key: 'auth.go-to-register-button-label' })}</Button>
                    </Link>
                </div>

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

                    <Button type={'link'} onClick={controller.onForgotPassPressed}>
                        {translate({ key: 'auth.forgot-password-button-label' })}
                    </Button>
                </Form>
            </div>
        </div>
    );
};
