import React from 'react'

const UserList = (props) => {
  
    return (
        <main>
            <table id="round-map" className='month-map-tables'>
                <thead>
                    <tr>
                        <th>Usuário</th>
                        <th>Primeiro nome</th>
                        <th>Último nome</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Data criação</th>
                    </tr>
                </thead>

                <tbody>
                    {props.users.map((user, index) => (
                        <tr key={index}>
                            <td key={user._id}>{user.userName}</td>
                            <td key={user._id}>{user.firstName}</td>
                            <td key={user._id}>{user.lastName}</td>
                            <td key={user._id}>{user.email}</td>
                            <td key={user._id}>{user.role}</td>
                            <td>{(new Date(user.dateCreated)).toLocaleDateString('pt-BR', { month: '2-digit', day: '2-digit', year: '2-digit' })}</td>
                        </tr>
                    ))}
                </tbody>   
            </table>
        </main>
    )
}

export default UserList