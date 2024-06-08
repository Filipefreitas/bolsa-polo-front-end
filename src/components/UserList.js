import React, {useContext} from 'react'
import ToggleButton from './ToggleButton'
import VoucherContext from '../context/VoucherContext.js';

const UserList = () => {
  
    const {users} = useContext(VoucherContext);

    return (
        <main>
            <table id="user-table" className='table-container'>
                <thead>
                    <tr>
                        <th><h1>Usuário</h1></th>
                        <th><h1>Primeiro nome</h1></th>
                        <th><h1>Último nome</h1></th>
                        <th><h1>Email</h1></th>
                        <th><h1>Perfil</h1></th>
                        <th><h1>Permissões</h1></th>
                        <th><h1>Data criação</h1></th>
                        <th><h1>Status</h1></th>
                    </tr>
                </thead>

                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>{user.userName}</td>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.email}</td>
                            <td>{user.role.name}</td>
                            <td>{user.role.permissions.map(permission => permission.name).join(', ')}</td>
                            <td>{(new Date(user.dateCreated)).toLocaleDateString('pt-BR', { month: '2-digit', day: '2-digit', year: '2-digit' })}</td>
                            <td><ToggleButton id={user._id} isActive={user.isActive}/></td>
                        </tr>
                    ))}
                </tbody>   
            </table>
        </main>
    )
}

export default UserList