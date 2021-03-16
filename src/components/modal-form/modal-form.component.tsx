import React from 'react';
import 'components/modal-form/modal-form.scss';
import { Form, Modal, Typography } from 'antd';
import { FormInstance, FormProps } from 'antd/lib/form';

export interface ModalFormProps<Values = []> extends FormProps {
    form: FormInstance<Values>;
    isVisible: boolean;
    isLoading: boolean;
    title?: string;
    onFinish?: (inputs: unknown) => void;
    onCancel?: () => void;
    okText?: string;
}

const ModalForm: React.FC<ModalFormProps> = (props) => {
    return (
        <Modal
            className={props.className}
            centered
            visible={props.isVisible}
            cancelButtonProps={{ disabled: props.isLoading }}
            okButtonProps={{ loading: props.isLoading }}
            closable={!props.isLoading}
            maskClosable={!props.isLoading}
            onCancel={props.onCancel}
            onOk={props.form.submit}
            okText={props.okText}
        >
            {props.title ? (
                <Typography.Title style={{ color: '#323a58' }} level={3}>
                    {props.title}
                </Typography.Title>
            ) : null}

            <Form colon={false} {...props} style={{ margin: '2vh 0 0 0' }}>
                {props.children}
            </Form>
        </Modal>
    );
};

export default ModalForm;
