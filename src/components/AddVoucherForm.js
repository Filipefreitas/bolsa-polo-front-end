import {useState, useContext} from 'react'
import Modal from '../components/Modal'
import VoucherContext from '../context/VoucherContext';

const AddVoucherForm = () => {

    const {setModal} = useContext(VoucherContext);

    const [formData, setFormData] = useState({
        percDiscount: "",
        qtdVouchers: "",
        errorPerc: "",
        errorQtd: "",
    });

    async function onCreateVoucher(evt) {
       
        evt.preventDefault();

        const convertedFormData = {
            ...formData,
            percDiscount: Number(formData.percDiscount),
            qtdVouchers: Number(formData.qtdVouchers)
        };

        try{
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify(convertedFormData)
            };

            const response = await fetch(`${process.env.REACT_APP_BACK_END_API_DOMAIN}/vouchers`, requestOptions);

            const data = await response.json();
            
            if (!response.ok) {
                setFormData({
                    percDiscount: formData.percDiscount,
                    qtdVouchers: formData.qtdVouchers,
                    errorPerc: data.errors["errorPerc"],
                    errorQtd: data.errors["errorQtd"]
                })
            }
            else {
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
        } catch (error) {
            console.error('Error fetching data:', error.message);
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
                            <p htmlFor="errorMessage" className="errorMessage text-left-alligned">{formData.errorPerc}</p>
                        </div>

                        <div>
                            <label htmlFor="qtdVouchers">Quantidade de vouchers a serem criados</label>
                            <input className="input-box-max" type="text" id="qtdVouchers" value={formData.qtdVouchers} onChange={(event)=>{
                                setFormData({...formData, qtdVouchers : event.target.value});
                            }}/>
                        </div>
                        <p htmlFor="errorMessage" className="errorMessage text-left-alligned">{formData.errorQtd}</p>
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
