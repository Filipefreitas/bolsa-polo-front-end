import React, { useState } from 'react';
import VoucherItemCard from '../components/VoucherItemCard'

const Collapsible = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCollapsible = () => {
      setIsOpen(!isOpen);
  };

  return (
      <div>
          <div className="collapsible-header" onClick={toggleCollapsible}>
              {props.title}
          </div>
          {isOpen && (
              <div className="collapsible-body">
                  {props.children}
                  <section className="movie-list-container grid grid-col-3">
                      {props.vouchers.map((voucher) => (
                          <VoucherItemCard
                              key={voucher._id}
                              id={voucher._id}
                              onDeleteVoucher={props.onDeleteVoucher}
                              percDiscount={voucher.percDiscount}
                              status={voucher.status}
                              createdAt={voucher.createdAt}
                          />
                      ))}
                  </section>
              </div>
          )}
      </div>
  );
};

export default Collapsible;