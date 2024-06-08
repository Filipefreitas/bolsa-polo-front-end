import React from 'react'
import Header from "../components/Header.js";
import Footer from "../components/Footer.js";
import Sidebar from "../components/Sidebar.js";
import UserList from "../components/UserList.js";

const LoginPage = () => 
{  
    return (
        <div className='main'>
            <Sidebar/>
            <Header/>
                <main>
                    <UserList/>
                </main>
            <Footer/>
        </div>
    )
}

export default LoginPage