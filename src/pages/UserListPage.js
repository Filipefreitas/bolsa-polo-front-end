import { React, useState, useEffect } from 'react'
import Header from "../components/Header.js";
import Footer from "../components/Footer.js";
import Sidebar from "../components/Sidebar.js";
import UserList from "../components/UserList.js";

const LoginPage = () => 
{  
    const[users, setUser] = useState([])
  
    useEffect(()=>{ 
        fetch(`${process.env.REACT_APP_BACK_END_API_DOMAIN}/users`)
        .then(response=>response.json())
        .then(json=>{
            setUser(json.data)
        })
        .catch(err=>{
                console.log(`Error ${err}`)
          })
        }, []);

    return (
        <div className='main'>
            <Sidebar/>
            <Header/>
                <main>
                    <UserList users={users}/>
                </main>
            <Footer/>
        </div>
    )
}

export default LoginPage