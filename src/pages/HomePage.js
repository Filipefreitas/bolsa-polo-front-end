import { React, useState, useEffect } from 'react'
import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchBox from "../components/SearchBox"
import Collapsible from '../components/Collapsible';

const HomePage = (props) => 
{           
    const [pendingVouchers, setPendingVouchers] = useState([])
    const [availableVouchers, setAvailableVouchers] = useState([])

    useEffect(()=>{ 
        fetch(`${process.env.REACT_APP_BACK_END_API_DOMAIN}/vouchers?status=waiting`)
        .then(response=>response.json())
        .then(json=>{
        setPendingVouchers(json.data)
        })
        .catch(err=>{
                console.log(`Error ${err}`)
        })
    }, []);

    useEffect(()=>{ 
        fetch(`${process.env.REACT_APP_BACK_END_API_DOMAIN}/vouchers?status=available`)
        .then(response=>response.json())
        .then(json=>{
            setAvailableVouchers(json.data)
        })
        .catch(err=>{
                console.log(`Error ${err}`)
        })
    }, []);


    return (
        <div>
            <Header/>
                <main>
                    <section>
                        <h2 className="section-title">Todos os Vouchers</h2>
                        <h3 className="section-title">Buscar voucher por percentual</h3>

                        <SearchBox 
                            vouchers={props.vouchers} setVouchers={props.setVouchers} 
                            allVouchers={props.allVouchers} setAllVouchers={props.setAllVouchers}
                            onFilterVouchers={props.onFilterVouchers}
                        />
                        </section>                                

                        <Collapsible
                            vouchers={props.vouchers} setVouchers={props.setVouchers} 
                            onDeleteVoucher={props.onDeleteVoucher} 
                            title="Lista de todos os vouchers cadastrados"
                        />

                        <Collapsible
                            vouchers={availableVouchers} setVouchers={setAvailableVouchers} 
                            onDeleteVoucher={props.onDeleteVoucher} 
                            title="Lista de todos os vouchers disponíveis"
                        />

                        <Collapsible
                            vouchers={pendingVouchers} setVouchers={setPendingVouchers} 
                            onDeleteVoucher={props.onDeleteVoucher} 
                            title="Lista de todos os vouchers aguardando deferimento"
                        />

                </main>
            <Footer/>
        </div>
    )
}

export default HomePage