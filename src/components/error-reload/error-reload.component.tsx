import React from 'react';
import 'components/error-reload/error-reload.scss';
import { Button, Result } from 'antd';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';

const ErrorReload: React.FC = () => {
    // State
    const { t } = useTranslation();
    const history = useHistory();

    return (
        <div className={'error-reload'}>
            <Result
                status="500"
                title="500"
                subTitle={t('common-errors.web-error-message')}
                extra={
                    <Button onClick={() => history.go(0)} type="primary">
                        {t('common-errors.reload-label')}
                    </Button>
                }
            />
        </div>
    );
};

export default ErrorReload;
