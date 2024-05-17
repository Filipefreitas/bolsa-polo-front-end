import Header from "../components/Header.js";
import Footer from "../components/Footer";
import RegistrationForm  from "../components/RegistrationForm";

const RegistrationPage = (props) => 
{  
    return (
        <div> 
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