import {useEffect,useState,useContext} from "react";
import {useAuth} from '../context/AuthContext'
import {useParams} from "react-router-dom"
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import Modal from "../components/Modal";
import StudentVoucherList  from "../components/StudentVoucherList";
import VoucherContext from "../context/VoucherContext";

const VoucherPage = () => {
    
    const {user} = useAuth(); 

    const {setModal} = useContext(VoucherContext);

    const {id} = useParams();

    const [voucher, setVoucher] = useState({})

    const [searchBox, setSearchBox] = useState("");
    
    const [student, setStudent] = useState();

    const [toggleSearched, setToggleSearched] = useState();

    const [totalStudentVouchers, setTotalStudentVouchers] = useState();

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

    const onGetStudent = (event)=>{

        event.preventDefault();
        setToggleSearched(1);

        fetch(`${process.env.REACT_APP_BACK_END_API_DOMAIN}/students/${searchBox}`)
        .then(response=>response.json())
        .then(json=>{    
            setStudent(json.data)
            setTotalStudentVouchers(json.totalVouchers)
        })
        .catch(err=>{
            console.log(`Error ${err}`)
        })
    }

    const onLinkVoucher = ()=> {

        //associa o voucher a um aluno
        const studentKeyValueObject = {
            studentVouchers: {
                _id: voucher._id
            } 
        };
          
        fetch(`${process.env.REACT_APP_BACK_END_API_DOMAIN}/students/${searchBox}`, {
            method: 'PATCH',
            headers : {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(studentKeyValueObject)
        })
        .then(setModal({
            msg: "Voucher associado ao aluno. Aguardar deferimento"
            , visible: true
        }))
        .catch(err=>{
            console.log(`Error ${err}`)
        })

        //atualiza o status do voucher e o associa a um aluno
        const voucherKeyValueObject = {
            "status": "waiting",
            "requestedBy": user,
            "requestedAt": Date.now(),
            "studentVouchers": {
                _id: student._id
            } 
        };
          
        fetch(`${process.env.REACT_APP_BACK_END_API_DOMAIN}/vouchers/${voucher._id}`, {
            method: 'PATCH',
            headers : {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(voucherKeyValueObject)
        })
        .catch(err=>{
            console.log(`Error ${err}`)
        })
    }    
    
    return (
        <div className='main'>
            <Sidebar/>
            <Header/>
            <Modal/>
            <main>
                <section id="">
                    <div className="voucher-description grid grid-col-3">
                        <div className="form-control-container">
                            <h3>Dados voucher</h3>
                            <p>Id do voucher: {voucher._id}</p>
                            <p>Percentual de desconto: {voucher.percDiscount}%</p>
                            <p>Status do voucher: {voucher.status}</p>
                            <p>Criado em: {(new Date(voucher.createdAt)).toLocaleDateString('pt-BR', { month: '2-digit', day: '2-digit', year: '2-digit' })}</p>
                        </div>
                        <div>
                            <section className={"search-box-container"}>
                                <h3>Buscar aluno por RA</h3>
                                
                                <form action="" className="grid grid-col-1" onSubmit={onGetStudent}>
                                    <input placeholder="Insira um RA" className="input-box-max" type="text" id="filter"
                                    value={searchBox} onChange={(event)=>{
                                        setSearchBox(event.target.value)
                                    }}/>
                                <div>
                                    <span className="form-control-container">
                                        <button className="registerbtn" type="submit">Buscar aluno</button>
                                    </span>  
                                </div>
                                </form>
                            </section>
                        </div>
                    </div>

                    <div>
                        <div className="voucher-description margin-top-25">
                            {student ? (
                                <div>
                                    <h3>Dados do aluno</h3>
                                    <p>CD_RA: {student.cdRa}</p> 
                                    <p>Nome: {student.nmAluno}</p>
                                    <p>Curso: {student.dsEspecialidade}</p>
                                    <p>Cod Unidade: {student.cdUnidade}</p>
                                    <p>Unidade: {student.dsUnidade}</p>
                                    <p>Situação Acadêmica: {student.dsSituacaoAcademica}</p>
                                    <p>Lista de vouchers:</p>
                                        <StudentVoucherList
                                            studentVouchers={student.studentVouchers} 
                                            student={student} 
                                            setStudent={setStudent}
                                            totalStudentVouchers={totalStudentVouchers}
                                            />

                                    <span className="form-control-container">
                                        <button className="registerbtn" type="text" onClick={onLinkVoucher}>Atribuir voucher</button>
                                    </span> 
                                </div>
                            ) : (
                                <div className={toggleSearched ? "" : "hide"}> 
                                    <h3>Dados do aluno</h3>
                                     <p>Aluno náo encontrado</p>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </main>
            <Footer/>
        </div>
    )
}

export default VoucherPage