import React from 'react';
import {useUsers} from '../context/UserContext.js'
import Header from "../components/Header.js";
import Footer from "../components/Footer.js";
import Sidebar from "../components/Sidebar.js";
import UserListTable from "../components/UserListTable.js";
import StatusCard from "../components/StatusCard.js"

const UserListPage = () => {
    const {users} = useUsers(); 

    return (
        <div className='main'>
            <Sidebar/>
            <Header/>
                <main>
                    <StatusCard
                        items={users} 
                        getStatus={(user) => user.status} 
                    />
                    <UserListTable/>
                </main>
            <Footer/>
        </div>
    )
}

export default UserListPage