import { React, useState, useEffect } from 'react'
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
    const[pendingVouchers, setPendingVouchers] = useState([])
    const[availableVouchers, setAvailableVouchers] = useState([])

    useEffect(()=>{ 
        fetch(`${process.env.REACT_APP_BACK_END_API_DOMAIN}/vouchers`)
        .then(response=>response.json())
        .then(json=>{
          setAllVouchers(json.data)
          setVouchers(json.data)
        })
        .catch(err=>{
                console.log(`Error ${err}`)
          })
        }, []);
    
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

    const filterVouchers = (input)=> { 
        let filteredVouchers = allVouchers.filter((voucher)=>{
          return voucher.percDiscount.toString().includes(input)
        });
        
        if(input === "")
        {
          setVouchers(allVouchers);
        }
        setVouchers(filteredVouchers);
      }
      
      const deleteVoucher = (id)=>{
        fetch(`${process.env.REACT_APP_BACK_END_API_DOMAIN}/vouchers/${id}`, {
          method: 'DELETE'
        })
        .then(props.setModal({
              msg: "Voucher deletado com sucesso"
              , visible: true
          }))
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
                        vouchers={availableVouchers} setVouchers={setAvailableVouchers} 
                        onDeleteVoucher={deleteVoucher} 
                    />

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

export default HomePage