import Header from "../components/Header.js";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar.js";
import RegistrationForm  from "../components/RegistrationForm";

const RegistrationPage = () => 
{  
    return (
        <div className='main'>
            <Sidebar/>
            <Header/>
                <main>
                   <RegistrationForm/>
                </main>
            <Footer/>
        </div>
    )
}

export default RegistrationPage