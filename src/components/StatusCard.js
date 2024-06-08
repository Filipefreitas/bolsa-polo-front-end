import React, { useEffect, useState } from 'react';

const groupItemsByStatus = (items, getStatus) => {
  return items.reduce((acc, item) => {
    const status = getStatus(item);
    if (!acc[status]) {
      acc[status] = 0;
    }
    acc[status]++;
    return acc;
  }, {});
};

const StatusCard = ({ items, getStatus, title }) => {
  const [groupedItems, setGroupedItems] = useState({});

  useEffect(() => {
    setGroupedItems(groupItemsByStatus(items, getStatus));
  }, [items, getStatus]);

  const sortedGroupedItems = Object.entries(groupedItems).sort(([statusA], [statusB]) => {
    return statusA.localeCompare(statusB); 
  });

  const totalItems = items.length;

  return (
    <div className="status-cards">
      <div className="status-card">
        <h3 className="m_title">Total {title}</h3>
        <p>{totalItems}</p>
      </div>
      {sortedGroupedItems.map(([status, count]) => (
        <div className="status-card" key={status}>
          <h3 className="m_title">{status}</h3>
          <p>{count}</p>
        </div>
      ))}
    </div>
  );
};

export default StatusCard;
