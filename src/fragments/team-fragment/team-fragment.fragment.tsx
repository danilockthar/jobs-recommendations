import React from 'react';
import 'fragments/team-fragment/team-fragment.scss';
import { TeamFragmentFragmentProps } from 'fragments/team-fragment/interfaces';
import { useTeamFragmentController } from 'fragments/team-fragment/team-fragment.controller';
import { Table, Tag, Space } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

export const TeamFragmentFragment: React.FC<TeamFragmentFragmentProps> = (props) => {
    const { useController = useTeamFragmentController } = props;
    const controller = useController();

    const deleteUser = (name: string) => {
        console.log('deleted: ', name);
    };

    const dataSource = [
        {
            key: '1',
            id: 1,
            name: 'Mike',
            lastname: 32,
            email: '10 Downing Street',
        },
        {
            key: '2',
            id: 2,
            name: 'John',
            lastname: 42,
            email: '10 Downing Street',
        },
    ];

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
                        <a onClick={() => deleteUser(record.name)}>
                            <DeleteOutlined />
                        </a>
                    </Space>
                );
            },
        },
    ];

    return (
        <div className={'team-fragment'}>
            <h2> Equipo</h2>
            <p>Lorep ipsum dolor sit amet, conse</p>
            <Table dataSource={dataSource} columns={columns} />;
        </div>
    );
};
