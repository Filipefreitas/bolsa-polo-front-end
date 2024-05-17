import React from 'react';
import {Link} from "react-router-dom"
import { FaWindowClose } from "react-icons/fa";
import { FaLink } from "react-icons/fa";
import { RiPassValidLine } from "react-icons/ri";

const VoucherItemCard = (props) => {

    const clickHandleDel = ()=> props.onDeleteVoucher(props.id);

    return (
      <div className="movie-container">
        <div className="grid grid-col-2 movie-top-area">
            <p className="">{props.percDiscount}%</p>
            <div className='grid-x-right'>
              <span>
                <span>
                {props.status === 'available'? (
                    <Link to = {`/vouchers/${props.id}`}>    
                      <FaLink className="icon-cursor icon-size-xlg margin-10"/>
                    </Link>
                    ): (<span></span>)
                  }    
                </span>
                
                <span>
                  {props.status === 'waiting'? (
                        <Link to = {`/approve/${props.id}`}>    
                          <RiPassValidLine className="icon-cursor icon-size-xlg margin-10"/>
                        </Link> 
                    ): (<span></span>)
                  }
                </span> 
                                
                <span>
                  {props.status === 'available'? (
                    <FaWindowClose onClick={clickHandleDel} className="icon-cursor icon-size-xlg margin-10"/>
                  ): (<span></span>)
                }
                </span>

              </span>
            </div>
        </div>

        <p className="movie-description">Id: {props.id}</p>
        <p className="movie-description">Status: {props.status}</p>
        <p className="movie-description">Criado em: {props.createdAt}</p>
    </div> 
  )
}

export default VoucherItemCard
