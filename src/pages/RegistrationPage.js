import Header from "../components/Header.js";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar.js";
import RegistrationForm  from "../components/RegistrationForm";

const RegistrationPage = (props) => 
{  
    return (
        <div> 
            <Sidebar/>
            <Header/>
            <main>
               <RegistrationForm
                    modal={props.modal} setModal={props.setModal} hideModal={props.hideModal}
               />
            </main>
            <Footer/>
        </div>
    )
}

export default RegistrationPage