import {useState, useContext} from 'react'
import Modal from '../components/Modal'
import VoucherContext from '../context/VoucherContext';

const AddVoucherForm = () => {

    const {setModal} = useContext(VoucherContext);

    const [errorPerc, setErrorPerc] = useState("");
    const [errorQtd, setErrorQtd] = useState("");
    const [formData, setFormData] = useState({
        percDiscount: undefined,
        qtdVouchers: undefined,
        errorPerc: "",
        errorQtd: "",
    });
    
    const validateForm = (percDiscount, qtdVouchers)=>{
    
        let isValidated = false;
        setErrorPerc("");
        setErrorQtd("");

        if(percDiscount === undefined)
        {
            setErrorPerc("Informe o valor do voucher a ser cadastrado (entre 1 e 100)");
        }
        else if(isNaN(percDiscount))
        {
            setErrorPerc("O percentual do voucher deve ser numérico entre 1 e 100");
        }
        else if(percDiscount < 0 || percDiscount > 100)
        {
            setErrorPerc("O percentual do voucher a ser cadastrado deve ser entre 1 e 100");
        }

        if(qtdVouchers === undefined)
        {
            setErrorQtd("Informe a quantidade de voucher a serem cadastrados (entre 1 e 10)");
        }

        if(isValidated)
        {
            isValidated = true;
            setErrorPerc("");
            setErrorQtd("");
            alert("Vouchers cadastrados com sucesso");
        }

        return isValidated;
    }

    const onCreateVoucher = (event)=>{
       
        event.preventDefault();

        setFormData({
            percDiscount: formData.percDiscount,
            qtdVouchers: formData.qtdVouchers
        }); 
                
        validateForm(formData.percDiscount, formData.qtdVouchers);
        
        if(validateForm)
        {
            for(let i=0; i < formData.qtdVouchers; i++){ 
                fetch(`${process.env.REACT_APP_BACK_END_API_DOMAIN}/vouchers`, {
                    method: 'POST',
                    headers : {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)              
                })
                .then(json=>{
                    setFormData({
                        percDiscount: json.percDiscount,
                        qtdVouchers: json.qtdVouchers
                  }) 
                })
                .catch(err=>{
                    console.log(`Error ${err}`)
                })

                if(i === formData.qtdVouchers - 1)
                {
                    setModal({
                        msg: "Vouchers cadastrados com sucesso"
                        , visible: true
                    })

                    setFormData({
                        percDiscount: "",
                        qtdVouchers: "",
                        errorPerc: "",
                        errorQtd: "",
                    });

                }
            }
        }        
    }

    return (
        <main>
            <Modal/>
            <section>
                <form action="" onSubmit={onCreateVoucher} className="form-control-container">
                    <div>
                        <div>
                            <label htmlFor="percDiscount">Percentual de desconto</label>
                            <input className="input-box-max" type="text" id="percDiscount" value={formData.percDiscount} onChange={(event)=>{
                                setFormData({...formData, percDiscount : event.target.value});
                            }}/>
                            <p htmlFor="errorMessage" className="errorMessage text-left-alligned">{errorPerc}</p>
                        </div>

                        <div>
                            <label htmlFor="qtdVouchers">Quantidade de vouchers a serem criados</label>
                            <input className="input-box-max" type="text" id="qtdVouchers" value={formData.qtdVouchers} onChange={(event)=>{
                                setFormData({...formData, qtdVouchers : event.target.value});
                            }}/>
                        </div>
                        <p htmlFor="errorMessage" className="errorMessage text-left-alligned">{errorQtd}</p>
                    </div>
                    
                
                    <div className="form-control-container">
                        <button className="registerbtn" type="submit">Criar vuochers</button>
                    </div>  
                </form>
            </section>
        </main>
    )
}

export default AddVoucherForm
