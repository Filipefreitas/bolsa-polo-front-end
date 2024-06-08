import {useState} from 'react'
import {useNavigate} from 'react-router-dom';
import {useAuth} from '../context/AuthContext';

const LoginForm = () => 
{
    const navigate = useNavigate();
    const {login} = useAuth();

    const [formData, setFormData] = useState({
        userName: "",
        password: "",
        errorMsg: ""
    });

    const onLogin = async(evt) => {

        evt.preventDefault();
        
        const response  = await login(formData);
        if (response.success) {
          navigate('/main');
        } 
        else {
            setFormData({ ...formData, errorMsg: response.message });
        }
    };            
    
    return (
        <div className="login-wrap">
        	<div className="login-html">
                <form action="" onSubmit={onLogin}>
                    <input id="tab-1" type="radio" name="tab" className="sign-in" checked/>
                    <label for="tab-1" className="tab">Login</label>

                    <div className="login-form">
                        <div className= "sign-in-htm">
                            <div className="group">
                                <label htmlFor="userName" className="label">User Name</label>
                                <input type="text" id="userName" className="input" value={formData.userName} onChange={(evt)=>{
                                    setFormData({...formData, userName : evt.target.value});
                                }}/>
                            </div>

                            <div className="group">
                                <label htmlFor="password" className="label">Password</label>
                                <input type="password" id="password" className="input" value={formData.password} onChange={(evt)=>{
                                    setFormData({...formData, password : evt.target.value});
                                }}/>
                            </div>

                            <span htmlFor="errorMessage" className="errorMessage2">{formData.errorMsg}</span>

                            <div className="group">
                                <button type="submit" className="button" >Login</button>
                            </div>
                            <div class="hr"></div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginForm