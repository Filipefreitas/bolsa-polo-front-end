import React from 'react'
import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchBox from "../components/SearchBox";
import Modal from '../components/Modal';
import Collapsible from '../components/Collapsible';
import Sidebar from '../components/Sidebar';

const HomePage = () => 
{           
    return (
        <div className='main'>
            <Sidebar/>
            <Modal/>

            <Header/>
                <main>
                    <h2 className="section-title">Todos os Vouchers</h2>

                    <Collapsible title="Lista de todos os vouchers cadastrados" filter="all">
                        <SearchBox />
                     </Collapsible>

                    <Collapsible title="Lista de todos os vouchers disponíveis" filter="available">
                        <SearchBox/>
                    </Collapsible>

                    <Collapsible title="Lista de todos os vouchers aguardando deferimento" filter="waiting"/>
                </main>
            <Footer/>
        </div>
    )
}

export default HomePage;
