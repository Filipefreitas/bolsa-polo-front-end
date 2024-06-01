import React from 'react';
import {Link} from "react-router-dom"
import { FaWindowClose } from "react-icons/fa";
import { FaLink } from "react-icons/fa";
import { RiPassValidLine } from "react-icons/ri";
import { useAuth } from '../context/AuthContext'

  const VoucherItemCard = (props) => {

  const { permissions } = useAuth(); 
  const clickHandleDel = ()=> props.onDeleteVoucher(props.id);

    return (
      <div className="movie-container">
        <div className="grid grid-col-2 movie-top-area">
            <p className="">{props.percDiscount}%</p>
            <div className='grid-x-right'>
              <span>
                <span>
                {props.status === 'available' && permissions.includes('link')? (
                    <Link to = {`/vouchers/${props.id}` }>    
                      <FaLink className="icon-cursor icon-size-xlg margin-10"/>
                    </Link>
                    ): null
                  }    
                </span>
                
                <span>
                    {props.status === 'waiting' && permissions.includes('approve') ? (
                      <Link to = {`/approve/${props.id}`}>    
                          <RiPassValidLine className="icon-cursor icon-size-xlg margin-10"/>
                        </Link> 
                    ): null
                  }
                </span> 
                                
                <span>
                  {props.status === 'available' && permissions.includes('delete') ? (
                    <FaWindowClose onClick={clickHandleDel} className="icon-cursor icon-size-xlg margin-10"/>
                  ): null
                }
                </span>

              </span>
            </div>
        </div>

        <p className="movie-description">Id: {props.id}</p>
        <p className="movie-description">Status: {props.status}</p>
        <p className="movie-description">Criado em: {(new Date(props.createdAt)).toLocaleDateString('pt-BR', { month: '2-digit', day: '2-digit', year: '2-digit' })}</p>
    </div> 
  )
}

export default VoucherItemCard
