import React from 'react';
import 'auth/components/button-logout/button-logout.scss';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { useLocalSession } from 'auth/helpers/session.hooks';

const ButtonLogout: React.FC = () => {
    const { t } = useTranslation();
    const [, , killSession] = useLocalSession();

    return (
        <div className={'button-logout'}>
            <Button
                danger
                type="link"
                onClick={() => {
                    killSession();
                }}
            >
                {t('general.logout')}
            </Button>
        </div>
    );
};

export default ButtonLogout;
