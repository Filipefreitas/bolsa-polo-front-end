import React, { useContext, useEffect, useState } from 'react';
import VoucherContext from '../context/VoucherContext';

const groupVouchersByStatus = (vouchers) => {
  return vouchers.reduce((acc, voucher) => {
    const status = voucher.status;
    if (!acc[status]) {
      acc[status] = 0;
    }
    acc[status]++;
    return acc;
  }, {});
};

const VoucherStatusCard = () => {
  const { allVouchers } = useContext(VoucherContext);
  const [groupedVouchers, setGroupedVouchers] = useState({});

  useEffect(() => {
    setGroupedVouchers(groupVouchersByStatus(allVouchers));
  }, [allVouchers]);

  const sortedGroupedVouchers = Object.entries(groupedVouchers).sort(([statusA], [statusB]) => {
    return statusA.localeCompare(statusB); 
  });

  return (
    <div className="voucher-cards">
      {sortedGroupedVouchers.map(([status, count]) => (
        <div className="voucher-card" key={status}>
          <h3 className="m_title">{status}</h3>
          <p>{count}</p>
        </div>
      ))}
    </div>
  );
};

export default VoucherStatusCard;
