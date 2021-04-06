import React, { useEffect } from 'react';
import 'fragments/team-fragment/team-fragment.scss';
import { TeamFragmentFragmentProps } from 'fragments/team-fragment/interfaces';
import { useTeamFragmentController } from 'fragments/team-fragment/team-fragment.controller';
import { Table, Tag, Space } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import FlexLoader from 'components/flex-loader/flex-loader.component';
import ModalForm from 'components/modal-form/modal-form.component';

export const TeamFragmentFragment: React.FC<TeamFragmentFragmentProps> = (props) => {
    const { useController = useTeamFragmentController } = props;
    const controller = useController();

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
                        <a onClick={() => controller.deleteEditor(record.id)}>
                            <DeleteOutlined />
                        </a>
                    </Space>
                );
            },
        },
    ];

    return (
        <div className={'team-fragment'}>
            <ModalForm
                title="Invita a tu equipo"
                isVisible={controller.isModalOpen}
                isLoading={false}
                onCancel={controller.toggleModal}
                onFinish={controller.toggleModal}
            >
                <input
                    className={'input-modal-invite'}
                    disabled
                    value={`http://localhost:9000/register?invitationCode=${controller.company.invitationCode}`}
                />
                <p>
                    Comparte este link con con aquellas personas que desees invitar. Pasaran a ser parte de de tu equipo
                    automáticamente después de registrarse en FunkeyUp.
                </p>
            </ModalForm>
            <h2> Equipo</h2>
            <p>Lorep ipsum dolor sit amet, conse</p>
            <button className={'invite-button-modal'} onClick={controller.toggleModal}>
                {' '}
                Invitar{' '}
            </button>
            {controller.isLoading ? <FlexLoader /> : <Table dataSource={controller.dataSource} columns={columns} />}
        </div>
    );
};
