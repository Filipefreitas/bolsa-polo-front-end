import React from 'react';

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

const VoucherStatusCard = ({ allVouchers }) => {
  const groupedVouchers = groupVouchersByStatus(allVouchers);

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
