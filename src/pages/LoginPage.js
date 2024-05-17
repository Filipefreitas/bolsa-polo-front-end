import Header from "../components/Header.js";
import Footer from "../components/Footer.js";
import LoginForm from "../components/LoginForm.js";

const LoginPage = () => 
{  
    return (
        <div> 
            <Header/>
                <main>
                    <LoginForm/>
                </main>
            <Footer/>
        </div>
    )
}

export default LoginPage