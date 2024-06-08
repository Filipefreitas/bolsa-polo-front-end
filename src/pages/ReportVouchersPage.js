import React from 'react'
import Header from "../components/Header.js";
import Footer from "../components/Footer.js";
import Sidebar from "../components/Sidebar.js";
import VoucherListTable from "../components/VoucherListTable.js";
import VoucherStatusCard from "../components/VoucherStatusCard.js"

const ReportVouchersPage = () => 
{  
    return (
        <div className='main'>
            <Sidebar/>
            <Header/>
                <main>
                    <VoucherStatusCard/>
                    <VoucherListTable/>
                </main>
            <Footer/>
        </div>
    )
}

export default ReportVouchersPage