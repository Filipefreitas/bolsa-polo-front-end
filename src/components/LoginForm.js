import {useState} from 'react'

const LoginForm = () => 
{
    const [formData, setFormData] = useState({
        userName: "",
        password: "",
        errorMsg: ""
    });

    const [success, setSucess] = useState(null);

    const onLogin = (evt) => {

        evt.preventDefault();

        fetch(`${process.env.REACT_APP_BACK_END_API_DOMAIN}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            setSucess(data.success);
        })
        .catch(error => {
          console.error('There was an error checking the username:', error);
        });

        if(success){
            alert("exists")
        }
        else{
            alert("denied")
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