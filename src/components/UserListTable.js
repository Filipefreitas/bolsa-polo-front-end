import React from 'react';
import {useUsers} from '../context/UserContext.js'
import Table from './Table';
import ToggleButton from './ToggleButton';

const UserList = () => {
  const {users} = useUsers(); 

  const columns = [
    { key: 'userName', header: 'Usuário' },
    { key: 'firstName', header: 'Primeiro nome' },
    { key: 'lastName', header: 'Último nome' },
    { key: 'email', header: 'Email' },
    { key: 'role.name', header: 'Perfil', render: (user) => user.role.name },
    { key: 'role.permissions', header: 'Permissões', render: (user) => user.role.permissions.map(permission => permission.name).join(', ') },
    { key: 'dateCreated', header: 'Data criação', render: (user) => (new Date(user.dateCreated)).toLocaleDateString('pt-BR', { month: '2-digit', day: '2-digit', year: '2-digit' }) },
    { key: 'status', header: 'Status', render: (user) => <ToggleButton id={user._id} status={user.status} /> },
  ];

  return <Table columns={columns} data={users} />;
};

export default UserList;
