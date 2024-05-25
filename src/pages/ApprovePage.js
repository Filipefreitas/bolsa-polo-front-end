import {useEffect,useState} from "react";
import {useParams} from "react-router-dom"
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";

const ApprovePage = (props) => {
    
    const {id} = useParams();

    const [voucher, setVoucher] = useState({
        _id: "",
        percDiscount: "",
        status: "",
        createdAt: "",
        studentVouchers: {
            _id: "",
            cdRa: "",
            nmAluno: "",
            dsEspecialidade: "",
            cdUnidade: "",
            dsUnidade: "",
            dsSituacaoAcademica: "",
            requestedAt: ""
        }
    })

    useEffect(()=>{
        fetch(`${process.env.REACT_APP_BACK_END_API_DOMAIN}/vouchers/${id}`)
        .then(response=>response.json())
        .then(json=>{    
            setVoucher(json.data);
        })
        .catch(err=>{
            console.log(`Error ${err}`)
        })

    },[])

    const updateVoucher = (value)=> {
        let status = "";
        let modalStatus = ""

        if(value === "approve"){
            status = "approved"
            modalStatus = "deferido"
        }
        else{
            status = "denied"
            modalStatus = "indeferido"
        }

        const voucherKeyValueObject = {
                "status": status,
                "evaluatedAt": Date.now()
        };
          
        fetch(`${process.env.REACT_APP_BACK_END_API_DOMAIN}/vouchers/${voucher._id}`, {
            method: 'PATCH',
            headers : {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(voucherKeyValueObject)
        })
        .then(props.setModal({
            msg: `Voucher ${modalStatus}`
            , visible: true
        }))
        .catch(err=>{
            console.log(`Error ${err}`)
        })
    }

    return (
        <div>
            <Sidebar/>
            <Header/>
            <main>
                <div className="grid grid-col-2">
                    <div>
                        <section>
                            <h4>Dados voucher</h4>
                            <p>Id do voucher: {voucher._id}</p>
                            <p>Percentual de desconto: {voucher.percDiscount}%</p>
                            <p>Status do voucher: {voucher.status}</p>
                            <p>Criado em: {voucher.createdAt}</p>
                            <p>Solicitado em: {voucher.requestedAt}</p>
                        </section>                        
                    </div>

                    <div>
                        <section>
                            <h4>Dados aluno</h4>
                            <p>Nome do Aluno: {voucher.studentVouchers.nmAluno}</p>
                            <p>CD RA: {voucher.studentVouchers.cdRa}</p>
                            <p>Curso: {voucher.studentVouchers.dsEspecialidade}</p>
                            <p>CD unidade: {voucher.studentVouchers.cdUnidade}</p>
                            <p>Unidade: {voucher.studentVouchers.dsUnidade}</p>
                            <p>Situação Acadêmica: {voucher.studentVouchers.dsSituacaoAcademica}</p>
                        </section>
                    </div>
                </div>
                <div>
                    <button className="btn btn-primary" onClick={()=> updateVoucher('approve')}>Deferir</button>
                    <button className="btn btn-primary" onClick={()=> updateVoucher('deny')}>Indeferir</button>
                </div>
            </main>
            <Footer/>
        </div>
    )
}

export default ApprovePage