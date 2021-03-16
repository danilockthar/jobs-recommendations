import React from 'react';
import { message, Modal, Space, Typography } from 'antd';
import { useTranslator } from 'tools/view-hooks/translator-hook';

export interface TranslatableString {
    key: string;
    extra?: { [key: string]: any };
}

export interface UIMessenger {
    showErrorMessage(message: TranslatableString): void;
    showErrorModal(title: TranslatableString, messages: TranslatableString[]): void;
    showSuccessMessage(message: TranslatableString): void;
}

export type UIMessengerHook = () => UIMessenger;

export const useMessenger: UIMessengerHook = (): UIMessenger => {
    const { translate } = useTranslator();

    const showErrorMessage = (errorMessage: TranslatableString) => {
        message.error(translate(errorMessage));
    };

    const showErrorModal = (title: TranslatableString, messages: TranslatableString[]) => {
        Modal.error({
            title: translate(title),
            content: (
                <Space direction={'vertical'}>
                    {messages.map((message) => (
                        <Typography.Text key={message.key}>{translate(message)}</Typography.Text>
                    ))}
                </Space>
            ),
        });
    };

    const showSuccessMessage = (successMessage: TranslatableString) => {
        message.success(translate(successMessage));
    };

    return { showErrorMessage, showErrorModal, showSuccessMessage };
};
