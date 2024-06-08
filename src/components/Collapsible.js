import React, { useState, useContext } from 'react';
import VoucherItemCard from '../components/VoucherItemCard';
import VoucherContext from '../context/VoucherContext';

const Collapsible = ({title, filter, children}) => {
  const {
    vouchers,
    filteredAvailableVouchers,
    deleteVoucher,
    filterVouchers,
    filterAvailableVouchers,
    pendingVouchers
  } = useContext(VoucherContext);

  const [isOpen, setIsOpen] = useState(false);

  const toggleCollapsible = () => {
    setIsOpen(!isOpen);
  };

  const displayVouchers = filter === 'available' ? filteredAvailableVouchers : (filter === 'waiting' ? pendingVouchers : vouchers);

  const filterFunction = filter === 'available' ? filterAvailableVouchers : filterVouchers;

  return (
    <div>
      <div className="collapsible-header" onClick={toggleCollapsible}>
        {title}
      </div>
      {isOpen && (
        <div className="collapsible-body">
          {React.Children.map(children, (child) =>
            React.cloneElement(child, { filterFunction }) 
          )}
          <section className="voucher-list-container grid grid-col-3">
            {displayVouchers.map((voucher) => (
              <VoucherItemCard
                key={voucher._id}
                id={voucher._id}
                onDeleteVoucher={deleteVoucher}
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
