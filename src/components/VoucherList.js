import React from 'react'
import VoucherItemCard from './VoucherItemCard'

const VoucherList = (props) => {
  
  return (
    <div>
        <section className="movie-list-container">
            {props.vouchers.map((voucher)=>(<VoucherItemCard 
              key={voucher._id} 
              id={voucher._id} 
              onDeleteVoucher={props.onDeleteVoucher} 
              percDiscount={voucher.percDiscount} 
              status={voucher.status} 
              createdAt={voucher.createdAt}/>
            ))}
        </section>
    </div>    
  )
}

export default VoucherList