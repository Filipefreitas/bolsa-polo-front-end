import Header from "../components/Header.js";
import Footer from "../components/Footer.js";
import Sidebar from "../components/Sidebar.js";
import AddVoucherForm from "../components/AddVoucherForm.js";

const NewVouchersPage = () => 
{  
    return (
        <div className='main'>
            <Sidebar/>
            <Header/>
                <main>
                    <AddVoucherForm/>
                </main>
            <Footer/>
        </div>
    )
}

export default NewVouchersPage