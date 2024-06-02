import { React, useState, useEffect } from 'react'
import Header from "../components/Header.js";
import Footer from "../components/Footer.js";
import Sidebar from "../components/Sidebar.js";
import VoucherListTable from "../components/VoucherListTable.js";

const ReportVouchersPage = () => 
{  
    const[allVouchers, setAllVouchers] = useState([]);

    useEffect(()=>{ 
        fetch(`${process.env.REACT_APP_BACK_END_API_DOMAIN}/vouchers`)
        .then(response=>response.json())
        .then(json=>{
          setAllVouchers(json.data)
        })
        .catch(err=>{
                console.log(`Error ${err}`)
          })
        }, []);

    return (
        <div> 
            <Sidebar/>
            <Header/>
                <main>
                    <VoucherListTable allVouchers={allVouchers}/>
                </main>
            <Footer/>
        </div>
    )
}

export default ReportVouchersPage