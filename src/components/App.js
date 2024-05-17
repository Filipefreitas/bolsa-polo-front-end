import { React, useState, useEffect } from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import HomePage from "../pages/HomePage";
import VoucherPage from "../pages/VoucherPage"
import ApprovePage from "../pages/ApprovePage"
import RegistrationPage  from "../pages/RegistrationPage";
import NewVouchersPage from '../pages/NewVouchersPage';
import LoginPage  from "../pages/LoginPage";
import Sidebar from './Sidebar';
import Modal from './Modal';
import '../css/App.css';

const App = () => {
  const[allVouchers, setAllVouchers] = useState([]);
  const[vouchers, setVouchers] = useState([]);

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

  useEffect(()=>{ 
    fetch(`${process.env.REACT_APP_BACK_END_API_DOMAIN}/vouchers`)
    .then(response=>response.json())
    .then(json=>{
      setAllVouchers(json.data)
      setVouchers(json.data)
    })
    .catch(err=>{
            console.log(`Error ${err}`)
      })
    }, []);
    
  const filterVouchers = (input)=> { 
    let filteredVouchers = allVouchers.filter((voucher)=>{
      return voucher.percDiscount.toString().includes(input)
    });
    
    if(input === "")
    {
      setVouchers(allVouchers);
    }
    setVouchers(filteredVouchers);
  }
  
  const deleteVoucher = (id)=>{
    fetch(`${process.env.REACT_APP_BACK_END_API_DOMAIN}/vouchers/${id}`, {
      method: 'DELETE'
    })
    .then(setModal({
          msg: "Voucher deletado com sucesso"
          , visible: true
      }))
    .catch(err=>{
      console.log(`Error ${err}`)
     });
  }

  return (

      <Router>
        <div>      
          <Sidebar/>
          <Modal modal={modal} onHide={hideModal}/>

          <div className="container">
            <main>
              <Routes>
                <Route exact path="/" element={<HomePage
                  vouchers={vouchers} setVouchers={setVouchers}
                  onFilterVouchers={filterVouchers}     
                  onDeleteVoucher={deleteVoucher}  
                  />}>
                </Route>
                
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

              </Routes>
            </main>
          </div>
        </div>
      </Router>

  );
}

export default App;