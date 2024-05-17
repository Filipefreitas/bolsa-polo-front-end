import {useState} from 'react'
import Modal from './Modal';

const RegistrationForm = (props) => 
{
    const [formData, setFormData] = useState({
        firstName : "",
        lastName : "",
        userName: "",
        email: "",
        role: "",
        password: "",
        firstNameErr: "",
        lastNameErr: "",
        userNameErr: "",
        emailErr: "",
        passwordErr: "",
        success: ""
    });

    async function onCreateAccount(evt) {

        evt.preventDefault();

        try{
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify(formData)
            };
            
            const response = await fetch(`${process.env.REACT_APP_BACK_END_API_DOMAIN}/users`, requestOptions);

            const data = await response.json();

            if (!response.ok) {
                setFormData({
                    firstName : formData.firstName,
                    lastName : formData.lastName,
                    userName : formData.userName,
                    email: formData.email,
                    role: formData.role,
                    password: formData.password,
                    firstNameErr: data.errors["firstNameErr"],
                    lastNameErr: data.errors["lastNameErr"],
                    userNameErr: data.errors["userNameErr"],
                    emailErr: data.errors["emailErr"],
                    roleErr: data.errors["roleErr"],
                    passwordErr: data.errors["passwordErr"]
                })
            }
            else{
                props.setModal({
                    msg: "Usuário cadastrado com sucesso"
                    , visible: true
                })

                setFormData({
                    firstName : "",
                    lastName : "",
                    userName : "",
                    email: "",
                    role: "",
                    password: "",
                    firstNameErr: "",
                    lastNameErr: "",
                    userNameErr: "",
                    emailErr: "",
                    roleErr: "",
                    passwordErr: ""
                })
            }    
        } catch (error) {
            console.error('Error fetching data:', error.message);
        }
    }
    
    return (
        <section id="register-section title">
            <Modal modal={props.modal} onHide={props.hideModal}/>

            <div className= "form-container horizontal-center">
            
                <h3>Register</h3>
                <span htmlFor="sucessMessage" className="sucess-message">{formData.success}</span>

                <form action="" onSubmit={onCreateAccount}>

                    <div className="form-control">
                        <label htmlFor="firstName" className="text-left-alligned">First Name</label>
                        <input type="text" id="firstName" value={formData.firstName} onChange={(evt)=>{
                            setFormData({...formData, firstName : evt.target.value});
                        }}/>
                        <span htmlFor="errorMessage" className="text-left-alligned">{formData.firstNameErr}</span>
                    </div>

                    <div className="form-control">
                        <label htmlFor="lastName" className="text-left-alligned">Last Name</label>
                        <input type="text" id="lastName" value={formData.lastName} onChange={(evt)=>{
                            setFormData({...formData, lastName : evt.target.value});
                        }}/>
                        <span htmlFor="errorMessage" className="text-left-alligned">{formData.lastNameErr}</span>
                    </div>

                    <div className="form-control">
                        <label htmlFor="userName" className="text-left-alligned">User Name</label>
                        <input type="text" id="userName"  value={formData.userName} onChange={(evt)=>{
                            setFormData({...formData, userName : evt.target.value});
                        }}/>
                        <span htmlFor="errorMessage" className="text-left-alligned">{formData.userNameErr}</span>
                    </div>

                    <div className="form-control">
                        <label htmlFor="email" className="text-left-alligned">Email</label>
                        <input type="text" id="email"  value={formData.email} onChange={(evt)=>{
                            setFormData({...formData, email : evt.target.value});
                        }}/>
                        <span htmlFor="errorMessage" className="text-left-alligned">{formData.emailErr}</span>
                    </div>

                    <div className="form-control">
                        <label htmlFor="role" className="text-left-alligned">Role</label>
                        <select type="text" id="role" value={formData.role} onChange={(evt)=>{
                            setFormData({...formData, role : evt.target.value});
                        }}>
                            <option value="" defaultValue>(seleciona uma opção)</option>
                            <option value="admin">Admin</option>
                            <option value="approver">Aprovador</option>
                            <option value="business partner">Parceiro</option>
                        </select>
                        <span htmlFor="errorMessage" className="text-left-alligned">{formData.roleErr}</span>
                    </div>

                    <div className="form-control">
                        <label htmlFor="password" className="text-left-alligned">Password</label>
                        <input type="password" id="password" value={formData.password} onChange={(evt)=>{
                            setFormData({...formData, password : evt.target.value});
                        }}/>
                        <span htmlFor="errorMessage" className="text-left-alligned">{formData.passwordErr}</span>
                    </div>

                    <div className="form-control">
                        <button className="btn btn-submit" type="submit">Criar usuário</button>
                    </div>

                </form>

              </div>

         </section>
    )
}

export default RegistrationForm