import React, { useContext } from 'react';
import Header from "../components/Header.js";
import Footer from "../components/Footer.js";
import Sidebar from "../components/Sidebar.js";
import VoucherListTable from "../components/VoucherListTable.js";
import StatusCard from "../components/StatusCard.js";
import VoucherContext from '../context/VoucherContext';

const ReportVouchersPage = () => {
    const {allVouchers} = useContext(VoucherContext);

    return (
        <div className='main'>
            <Sidebar/>
            <Header/>
                <main>
                    <StatusCard
                        items={allVouchers} 
                        getStatus={(voucher) => voucher.status} 
                    />
                    <VoucherListTable/>
                </main>
            <Footer/>
        </div>
    )
}

export default ReportVouchersPage