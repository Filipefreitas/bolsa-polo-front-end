import React from 'react';

const Table = ({columns, data}) => {
  return (
    <div>
      <table className="table-container">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}><h1>{column.header}</h1></th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item._id}>
              {columns.map((column) => (
                <td key={column.key}>{column.render ? column.render(item) : item[column.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
