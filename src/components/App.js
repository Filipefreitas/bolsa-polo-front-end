import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {AuthProvider} from '../context/AuthContext';
import VoucherContext from '../context/VoucherContext';
import {UserProvider} from '../context/UserContext';
import HomePage from "../pages/HomePage";
import LoginForm from './LoginForm';
import Modal from './Modal';
import VoucherPage from "../pages/VoucherPage";
import ApprovePage from "../pages/ApprovePage";
import RegistrationPage  from "../pages/RegistrationPage";
import NewVouchersPage from '../pages/NewVouchersPage';
import LoginPage from "../pages/LoginPage";
import UserListPage from "../pages/UserListPage";
import ReportVouchersPage from "../pages/ReportVouchersPage";
import '../css/App.css';

const App = () => {

  const[allVouchers, setAllVouchers] = useState([]);
  const[vouchers, setVouchers] = useState([]);
  const[pendingVouchers, setPendingVouchers] = useState([]);
  const[availableVouchers, setAvailableVouchers] = useState([]);
  const[filteredAvailableVouchers, setFilteredAvailableVouchers] = useState([]);

  const[modal, setModal] = useState({
    msg: '',
    visible: false
  });

  const hideModal = ()=>{
    setModal({
      msg: ""
      , visible: false
  })};

  useEffect(()=>{ 
    fetch(`${process.env.REACT_APP_BACK_END_API_DOMAIN}/vouchers`)
    .then(response=>response.json())
    .then(json=>{
      setAllVouchers(json.data);
      setVouchers(json.data);
    })
    .catch(err=>{
            console.log(`Error ${err}`)
      })
  }, []);

  useEffect(()=>{ 
    fetch(`${process.env.REACT_APP_BACK_END_API_DOMAIN}/vouchers?status=waiting`)
    .then(response=>response.json())
    .then(json=>{
    setPendingVouchers(json.data);
    })
    .catch(err=>{
            console.log(`Error ${err}`)
    })
  }, []);

  useEffect(()=>{ 
    fetch(`${process.env.REACT_APP_BACK_END_API_DOMAIN}/vouchers?status=available`)
    .then(response=>response.json())
    .then(json=>{
        setAvailableVouchers(json.data);
        setFilteredAvailableVouchers(json.data);
    })
    .catch(err=>{
      console.log(`Error ${err}`)
    })
  }, []);
  
  const filterVouchers = (input)=> { 
    let filteredVouchers = allVouchers.filter((voucher)=>{
      return voucher.percDiscount.toString().includes(input);
    });
    
    if(input === "") {
      setVouchers(allVouchers);
    } else {
      setVouchers(filteredVouchers);
    }
  }

  const filterAvailableVouchers = (input) => {
    let filteredVouchers = availableVouchers.filter((voucher)=>{
        return voucher.percDiscount.toString().includes(input);
    });
    
    if(input === "") {
        setFilteredAvailableVouchers(availableVouchers);
    } else {
        setFilteredAvailableVouchers(filteredVouchers);
    }
  }
    
  const deleteVoucher = (id)=>{
    fetch(`${process.env.REACT_APP_BACK_END_API_DOMAIN}/vouchers/${id}`, {
      method: 'DELETE'
    })
    .then(() => {
        setModal({
          msg: "Voucher deletado com sucesso",
          visible: true
      });
      setAllVouchers(allVouchers.filter(voucher => voucher.id !== id));
      setVouchers(vouchers.filter(voucher => voucher.id !== id));
      setAvailableVouchers(availableVouchers.filter(voucher => voucher.id !== id));
      setFilteredAvailableVouchers(filteredAvailableVouchers.filter(voucher => voucher.id !== id));
    })
    .catch(err=>{
      console.log(`Error ${err}`)
    });
  }

  return (
    <AuthProvider>

      <VoucherContext.Provider 
        value={{
          modal, setModal, hideModal, 
          allVouchers, setAllVouchers, 
          vouchers, setVouchers, 
          pendingVouchers, setPendingVouchers, 
          availableVouchers, setAvailableVouchers, 
          filteredAvailableVouchers, setFilteredAvailableVouchers, filterAvailableVouchers,
          filterVouchers, deleteVoucher
          }}
        >

          <UserProvider>

          <Router>
            <div>
              <Modal/>
              <div className="container">
                <main>
                  <Routes>
                    <Route exact path="/" element={<LoginForm/>}></Route>                

                    <Route exact path="/main" element={<HomePage/>}></Route>

                    <Route exact path= "/vouchers/:id" element={<VoucherPage/>} className="menu-item"></Route>

                    <Route exact path="/approve/:id" element={<ApprovePage/>} className="menu-item"></Route>

                    <Route exact path="/registration" element={<RegistrationPage/>}className="menu-item"></Route>

                    <Route exact path="/login" element={<LoginPage/>}className="menu-item"></Route>

                    <Route  exact path="/vouchers" element={<ReportVouchersPage/>}className="menu-item"></Route >

                    <Route  exact path="/new-vouchers" element={<NewVouchersPage/>}className="menu-item"></Route >

                    <Route  exact path="/users" element={<UserListPage/>}className="menu-item"></Route >

                  </Routes>
                </main>
              </div>
            </div>
          </Router>
        </UserProvider>
      </VoucherContext.Provider>
    </AuthProvider>
  );
};

export default App;