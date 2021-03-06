import React, { useContext, useEffect } from 'react';
import 'fragments/team-fragment/team-fragment.scss';
import { TeamFragmentFragmentProps } from 'fragments/team-fragment/interfaces';
import { Link } from 'react-router-dom';
import { useTeamFragmentController } from 'fragments/team-fragment/team-fragment.controller';
import { Table, Tag, Space, Input, Divider, Button, Form } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import FlexLoader from 'components/flex-loader/flex-loader.component';
import ModalForm from 'components/modal-form/modal-form.component';
import { Typography } from 'antd';
import { LoadingOutlined, LockOutlined } from '@ant-design/icons';
import Modal from 'antd/lib/modal/Modal';
import { SessionContext } from 'auth/helpers/session.context';

export const TeamFragmentFragment: React.FC<TeamFragmentFragmentProps> = (props) => {
    const { useController = useTeamFragmentController } = props;
    const controller = useController();

    const { Title, Paragraph, Text } = Typography;
    const { company } = useContext(SessionContext);

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Nombre',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Apellido',
            dataIndex: 'lastname',
            key: 'lastname',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Action',
            key: 'action',
            render: function deleteItem(record: any) {
                return (
                    <Space size="middle">
                        <a onClick={() => controller.confirmEditor(record.id, record.email)}>
                            <DeleteOutlined />
                        </a>
                    </Space>
                );
            },
        },
    ];

    return (
        <div className={'team-fragment'}>
            {controller.fixedMessage.length > 10 && <p className="fixed-message"> {controller.fixedMessage} </p>}
            <Modal
                onOk={controller.toggleModal}
                onCancel={controller.toggleModal}
                visible={controller.isModalOpen}
                footer={null}
                title="Invita a tu equipo"
            >
                <Form initialValues={{ remember: true }} onFinish={(_) => controller.sendInvitationEditor()}>
                    <Form.Item
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}
                        validateStatus={controller.emailToInvitate.error ? 'error' : 'success'}
                        hasFeedback={controller.emailToInvitate.error ? true : false}
                        help={
                            controller.emailToInvitate.error ? (
                                <p style={{ color: 'red' }}> {controller.emailToInvitate.error} </p>
                            ) : null
                        }
                    >
                        <label>Email</label>
                        <Input
                            onChange={(e) => controller.onChangeEmail(e)}
                            required
                            type="email"
                            placeholder="Ingresa el email de quien quieres invitar"
                            name="email"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button loading={controller.isModalLoading} type="primary" htmlType="submit">
                            {' '}
                            Invitar{' '}
                        </Button>
                    </Form.Item>
                </Form>
                <Divider />
                <Typography>
                    <Paragraph
                        className={'input-modal-invite'}
                        copyable
                    >{`http://localhost:9000/register?invitationCode=${company.invitationCode}`}</Paragraph>
                </Typography>
                <p>
                    Comparte este link con con aquellas personas que desees invitar. Pasaran a ser parte de de tu equipo
                    autom??ticamente despu??s de registrarse en FunkeyUp.
                </p>
            </Modal>
            <Modal
                className={'as'}
                centered
                visible={controller.isModalDeleteOpen}
                cancelButtonProps={{ disabled: false }}
                okButtonProps={{ loading: false }}
                closable={true}
                maskClosable={true}
                onCancel={controller.closeDeleteModal}
                onOk={() => controller.deleteEditor(controller.editor.id, controller.editor.email)}
                okText={controller.isModalLoading ? <LoadingOutlined style={{ fontSize: 15 }} spin /> : 'Aceptar'}
            >
                <Paragraph> {`??Desea eliminar a ${controller.editor.email}?`}</Paragraph>
            </Modal>
            {(company && company.subscriptions?.length === 0 && company.mustUpgrade) ||
            (company && company.subscriptions?.slice().reverse()[0]?.status === 'canceled' && company.mustUpgrade) ? (
                <h2 className="lock-view">
                    {' '}
                    <LockOutlined style={{ fontSize: '30px', color: '#08c' }} /> Para poder usar las funciones de equipo
                    debe solicitar una membres??a.
                    <Link to="/subscriptions">
                        <button> Ir a membres??as</button>
                    </Link>
                </h2>
            ) : (
                <>
                    <h2> Equipo</h2>
                    <p>Organiza tu equipo de trabajo.</p>
                    <button className={'invite-button-modal'} onClick={controller.toggleModal}>
                        {' '}
                        Invitar{' '}
                    </button>
                    {controller.isLoading ? (
                        <FlexLoader />
                    ) : (
                        <Table
                            dataSource={controller.dataSource}
                            columns={columns.filter((col) => col.dataIndex !== 'id')}
                        />
                    )}
                </>
            )}
        </div>
    );
};
