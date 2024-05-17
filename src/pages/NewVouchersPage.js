import Header from "../components/Header.js";
import Footer from "../components/Footer.js";
import AddVoucherForm from "../components/AddVoucherForm.js";

const NewVouchersPage = (props) => 
{  
    return (
        <div> 
            <Header/>
                <main>
                    <AddVoucherForm
                        modal={props.modal} setModal={props.setModal} hideModal={props.hideModal}
                    />
                </main>
            <Footer/>
        </div>
    )
}

export default NewVouchersPage