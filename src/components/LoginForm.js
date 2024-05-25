import {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginForm = () => 
{
    const navigate = useNavigate();
    const { login } = useAuth();

    const [formData, setFormData] = useState({
        userName: "",
        password: "",
        errorMsg: ""
    });

    const onLogin = async(evt) => {

        evt.preventDefault();
        
        const isAuthenticated = await login(formData);
        if (isAuthenticated) {
          navigate('/main');
        } 
        else {
            alert('Login failed');
        }
    };            
    
    return (
        <section id="register-section title">

        <div className= "form-container horizontal-center">
        
            <h3>Login</h3>
            <span htmlFor="sucessMessage" className="sucess-message">{formData.success}</span>

            <form action="" onSubmit={onLogin}>

                <div className="form-control">
                    <label htmlFor="userName" className="text-left-alligned">User Name</label>
                    <input type="text" id="userName"  value={formData.userName} onChange={(evt)=>{
                        setFormData({...formData, userName : evt.target.value});
                    }}/>
                </div>

                <div className="form-control">
                    <label htmlFor="password" className="text-left-alligned">Password</label>
                    <input type="password" id="password" value={formData.password} onChange={(evt)=>{
                        setFormData({...formData, password : evt.target.value});
                    }}/>
                </div>

                <span htmlFor="errorMessage" className="text-left-alligned">{formData.errorMsg}</span>

                <div className="form-control">
                    <button className="btn btn-submit" type="submit">Login</button>
                </div>

            </form>

        </div>

    </section>
    )
}

export default LoginForm