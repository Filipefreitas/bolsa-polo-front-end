import React from 'react';
import VoucherItemCard from './VoucherItemCard';

const VoucherList = () => {
  
  return (
    <div>
        <section className="movie-list-container">
            {vouchers.map((voucher)=>(<VoucherItemCard 
              key={voucher._id} 
              id={voucher._id} 
              percDiscount={voucher.percDiscount} 
              status={voucher.status} 
              createdAt={(new Date(createdAt)).toLocaleDateString('pt-BR', { month: '2-digit', day: '2-digit', year: '2-digit' })}/>
            ))}
        </section>
    </div>    
  )
}

export default VoucherList