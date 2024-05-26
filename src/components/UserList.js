import React from 'react'

const UserList = (props) => {
  
    return (
        <main>
            <table id="round-map" className='table-container'>
                <thead>
                    <tr>
                        <th><h1>Usuário</h1></th>
                        <th><h1>Primeiro nome</h1></th>
                        <th><h1>Último nome</h1></th>
                        <th><h1>Email</h1></th>
                        <th><h1>Role</h1></th>
                        <th><h1>Data criação</h1></th>
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