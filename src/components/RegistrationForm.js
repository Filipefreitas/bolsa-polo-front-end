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
            
            <form action="" onSubmit={onCreateAccount}> 
                <h3>Cadastrar usuário</h3>
                <div class="register-container">
                    <div>
                        <label htmlFor="firstName">Primeiro nome</label>
                        <input type="text" id="firstName" value={formData.firstName} onChange={(evt)=>{
                            setFormData({...formData, firstName : evt.target.value});
                        }}/>
                        <p htmlFor="errorMessage" className='errorMessage'>{formData.firstNameErr}</p>
                    </div>

                    <div>
                        <label htmlFor="lastName">Último nome</label>
                        <input type="text" id="lastName" value={formData.lastName} onChange={(evt)=>{
                            setFormData({...formData, lastName : evt.target.value});
                        }}/>
                        <p htmlFor="errorMessage" className='errorMessage'>{formData.lastNameErr}</p>
                    </div>

                    <div>
                        <label htmlFor="userName">Nome usuário</label>
                        <input type="text" id="userName"  value={formData.userName} onChange={(evt)=>{
                            setFormData({...formData, userName : evt.target.value});
                        }}/>
                        <p htmlFor="errorMessage" className='errorMessage'>{formData.userNameErr}</p>
                    </div>

                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="text" id="email"  value={formData.email} onChange={(evt)=>{
                            setFormData({...formData, email : evt.target.value});
                        }}/>
                        <p htmlFor="errorMessage" className='errorMessage'>{formData.emailErr}</p>
                    </div>

                    <div>
                        <label htmlFor="role">Perfil</label>
                        <select type="text" id="role" value={formData.role} onChange={(evt)=>{
                            setFormData({...formData, role : evt.target.value});
                        }}>
                            <option value="" defaultValue>(seleciona uma opção)</option>
                            <option value="admin">Admin</option>
                            <option value="approver">Aprovador</option>
                            <option value="partner">Parceiro</option>
                        </select>
                        <p htmlFor="errorMessage" className='errorMessage'>{formData.roleErr}</p>
                    </div>

                    <div>
                        <label htmlFor="password">Senha</label>
                        <input type="password" id="password" value={formData.password} onChange={(evt)=>{
                            setFormData({...formData, password : evt.target.value});
                        }}/>
                        <p htmlFor="errorMessage" className='errorMessage'>{formData.passwordErr}</p>
                    </div>

                    <div>
                        <button className="registerbtn" type="submit">Criar usuário</button>
                    </div>
                </div>
            </form>

         </section>
    )
}

export default RegistrationForm