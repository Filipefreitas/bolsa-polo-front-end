import React, {useContext} from 'react';
import {useAuth} from '../context/AuthContext'
import {Link} from "react-router-dom"
import { FaWindowClose } from "react-icons/fa";
import { FaLink } from "react-icons/fa";
import { RiPassValidLine } from "react-icons/ri";
import VoucherContext from '../context/VoucherContext';

const VoucherItemCard = ({ id, percDiscount, status, createdAt }) => {

  const {permissions} = useAuth(); 
  const {deleteVoucher} = useContext(VoucherContext);

    return (
      <div className="movie-container">
        <div className="grid grid-col-2 movie-top-area">
            <p className="">{percDiscount}%</p>
            <div className='grid-x-right'>
              <span>
                <span>
                {status === 'available' && permissions.includes('link')? (
                    <Link to = {`/vouchers/${id}`}>    
                      <FaLink className="icon-cursor icon-size-m icon-black margin-left-10"/>
                    </Link>
                    ): null
                  }    
                </span>
                
                <span>
                    {status === 'waiting' && permissions.includes('approve') ? (
                      <Link to = {`/approve/${id}`}>    
                        <RiPassValidLine className="icon-cursor icon-size-m icon-black margin-left-10"/>
                      </Link> 
                    ): null
                  }
                </span> 
                                
                <span>
                  {status === 'available' && permissions.includes('delete') ? (
                    <FaWindowClose onClick={() => deleteVoucher(id)} className="icon-cursor icon-size-m icon-black margin-left-10"/>
                  ): null
                }
                </span>

              </span>
            </div>
        </div>

        <p className="movie-description">Id: {id}</p>
        <p className="movie-description">Status: {status}</p>
        <p className="movie-description">Criado em: {(new Date(createdAt)).toLocaleDateString('pt-BR', { month: '2-digit', day: '2-digit', year: '2-digit' })}</p>
    </div> 
  )
}

export default VoucherItemCard
