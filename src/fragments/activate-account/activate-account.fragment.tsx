import React, { useEffect } from 'react';
import 'fragments/activate-account/activate-account.scss';
import { ActivateAccountFragmentProps } from 'fragments/activate-account/interfaces';
import { useActivateAccountController } from 'fragments/activate-account/activate-account.controller';
import { Link, useLocation } from 'react-router-dom';
import { Button } from 'antd';
import { CheckCircleTwoTone, FrownOutlined } from '@ant-design/icons';
import { useTranslator } from 'tools/view-hooks/translator-hook';
import FlexLoader from 'components/flex-loader/flex-loader.component';

export const ActivateAccountFragment: React.FC<ActivateAccountFragmentProps> = (props) => {
    const { useController = useActivateAccountController } = props;
    const controller = useController();
    const { translate } = useTranslator();

    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }
    const query = useQuery();

    useEffect(() => {
        if (query.get('confirmation_token')) {
            controller.confirmEmail(query.get('confirmation_token') || '');
        }
    }, [query.get('confirmation_token')]);

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
                {/* <div className="register-wrapper">
                    <p> ¿Ya tienes una cuenta?</p>
                    <Link to={'/login'}>
                        <Button>{translate({ key: 'auth.go-to-login-button-label' })}</Button>
                    </Link>
                </div> */}
                {controller.isLoading ? (
                    <div className={'has-to-confirm-wrapper'}>
                        <FlexLoader />
                    </div>
                ) : controller.isValidated ? (
                    <div className={'has-to-confirm-wrapper'}>
                        <CheckCircleTwoTone style={{ fontSize: '30px', textAlign: 'center' }} />
                        <h1>Haz confirmado tu cuenta correctamente.</h1>
                        <Link to={'/login'}>
                            <Button>{translate({ key: 'auth.go-to-login-button-label' })}</Button>
                        </Link>
                    </div>
                ) : (
                    <div className={'has-to-confirm-wrapper'}>
                        <FrownOutlined style={{ fontSize: '30px', textAlign: 'center' }} />
                        <h1>No se pudo validar la cuenta.</h1>
                        <Link to={'/login'}>
                            <Button>{translate({ key: 'auth.go-to-login-button-label' })}</Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};
