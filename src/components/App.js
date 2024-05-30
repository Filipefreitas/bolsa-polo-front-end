import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider  } from '../context/AuthContext';

import '../css/App.css';
import HomePage from "../pages/HomePage";
import LoginForm from './LoginForm';
import Modal from './Modal';
import VoucherPage from "../pages/VoucherPage";
import ApprovePage from "../pages/ApprovePage";
import RegistrationPage  from "../pages/RegistrationPage";
import NewVouchersPage from '../pages/NewVouchersPage';
import LoginPage from "../pages/LoginPage";
import UserListPage from "../pages/UserListPage";

const App = () => {
  const[modal, setModal] = useState({
    msg: '',
    visible: false
  });

  const hideModal = ()=>{
    setModal({
        msg: ""
        , visible: false
    })
};

  return (
    <AuthProvider>
        <Router>
          <div>
            <Modal modal={modal} onHide={hideModal}/>
            <div className="container">
              <main>
                <Routes>
                  <Route exact path="/" element={<LoginForm/>}></Route>                

                  <Route exact path="/main" element={<HomePage
                    modal={modal} setModal={setModal} hideModal={hideModal}
                  />}></Route>

                  <Route exact path= "/vouchers/:id" element={<VoucherPage
                    modal={modal} setModal={setModal} hideModal={hideModal}
                  />} className="menu-item"></Route>

                  <Route exact path="/approve/:id" element={<ApprovePage
                    modal={modal} setModal={setModal} hideModal={hideModal}
                  />} className="menu-item"></Route>

                  <Route exact path="/registration" element={<RegistrationPage
                    modal={modal} setModal={setModal} hideModal={hideModal}
                  />}className="menu-item"></Route>

                  <Route exact path="/login" element={<LoginPage/>}className="menu-item"></Route>

                  <Route  exact path="/new-vouchers" element={<NewVouchersPage 
                    modal={modal} setModal={setModal} hideModal={hideModal}
                  />}className="menu-item"></Route >

                  <Route  exact path="/users" element={<UserListPage
                    modal={modal} setModal={setModal} hideModal={hideModal}
                  />}className="menu-item"></Route >

                </Routes>
              </main>
            </div>
          </div>
        </Router>
      </AuthProvider>
  );
}

export default App;