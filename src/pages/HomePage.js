import {React, useState, useEffect} from 'react'
import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchBox from "../components/SearchBox";
import Modal from '../components/Modal';
import Collapsible from '../components/Collapsible';
import Sidebar from '../components/Sidebar';

const HomePage = (props) => 
{           
    const[allVouchers, setAllVouchers] = useState([]);
    const[vouchers, setVouchers] = useState([]);
    const[pendingVouchers, setPendingVouchers] = useState([]);
    const[availableVouchers, setAvailableVouchers] = useState([]);
    const[filteredAvailableVouchers, setFilteredAvailableVouchers] = useState([]);

    useEffect(()=>{ 
        fetch(`${process.env.REACT_APP_BACK_END_API_DOMAIN}/vouchers`)
        .then(response=>response.json())
        .then(json=>{
          setAllVouchers(json.data);
          setVouchers(json.data);
        })
        .catch(err=>{
                console.log(`Error ${err}`)
          })
        }, []);
    
    useEffect(()=>{ 
        fetch(`${process.env.REACT_APP_BACK_END_API_DOMAIN}/vouchers?status=waiting`)
        .then(response=>response.json())
        .then(json=>{
        setPendingVouchers(json.data);
        })
        .catch(err=>{
                console.log(`Error ${err}`)
        })
    }, []);

    useEffect(()=>{ 
        fetch(`${process.env.REACT_APP_BACK_END_API_DOMAIN}/vouchers?status=available`)
        .then(response=>response.json())
        .then(json=>{
            setAvailableVouchers(json.data);
            setFilteredAvailableVouchers(json.data);
        })
        .catch(err=>{
                console.log(`Error ${err}`)
        })
    }, []);

    const filterVouchers = (input)=> { 
        let filteredVouchers = allVouchers.filter((voucher)=>{
          return voucher.percDiscount.toString().includes(input);
        });
        
        if(input === "") {
          setVouchers(allVouchers);
        } else {
          setVouchers(filteredVouchers);
        }
      }

    const filterAvailableVouchers = (input) => {
        let filteredVouchers = availableVouchers.filter((voucher)=>{
            return voucher.percDiscount.toString().includes(input);
        });
        
        if(input === "") {
            setFilteredAvailableVouchers(availableVouchers);
        } else {
            setFilteredAvailableVouchers(filteredVouchers);
        }
    }
      
    const deleteVoucher = (id)=>{
        fetch(`${process.env.REACT_APP_BACK_END_API_DOMAIN}/vouchers/${id}`, {
          method: 'DELETE'
        })
        .then(() => {
            props.setModal({
              msg: "Voucher deletado com sucesso",
              visible: true
          });
          setAllVouchers(allVouchers.filter(voucher => voucher.id !== id));
          setVouchers(vouchers.filter(voucher => voucher.id !== id));
          setAvailableVouchers(availableVouchers.filter(voucher => voucher.id !== id));
          setFilteredAvailableVouchers(filteredAvailableVouchers.filter(voucher => voucher.id !== id));
        })
        .catch(err=>{
          console.log(`Error ${err}`)
         });
    }

    return (
        <div className='main'>
            <Sidebar/>
            <Modal modal={props.modal} onHide={props.hideModal}/>

            <Header/>
                <main>
                    <h2 className="section-title">Todos os Vouchers</h2>

                    <Collapsible
                        title="Lista de todos os vouchers cadastrados"
                        vouchers={vouchers} setVouchers={setVouchers} 
                        onDeleteVoucher={deleteVoucher} 
                    >
                        <SearchBox 
                            vouchers={vouchers} setVouchers={setVouchers} 
                            allVouchers={allVouchers} setAllVouchers={setAllVouchers}
                            onFilterVouchers={filterVouchers}
                        />
                     </Collapsible>

                    <Collapsible
                        title="Lista de todos os vouchers disponíveis"
                        vouchers={filteredAvailableVouchers} setVouchers={setFilteredAvailableVouchers} 
                        onDeleteVoucher={deleteVoucher} 
                    >
                        <SearchBox 
                            vouchers={filteredAvailableVouchers} setVouchers={setFilteredAvailableVouchers} 
                            allVouchers={availableVouchers} setAllVouchers={setAvailableVouchers}
                            onFilterVouchers={filterAvailableVouchers}
                        />
                    </Collapsible>

                    <Collapsible
                        title="Lista de todos os vouchers aguardando deferimento"
                        vouchers={pendingVouchers} setVouchers={setPendingVouchers}     
                        onDeleteVoucher={deleteVoucher} 
                    />
                </main>
            <Footer/>
        </div>
    )
}

export default HomePage;
