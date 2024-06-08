import React from 'react';

const StudentVoucherCard = ({id, percDiscount, status, requestedAt, evaluatedBy, evaluatedAt}) => {

    return (
      <div className="movie-container">
        <div className="grid grid-col-2 movie-top-area">
            <p className="">{percDiscount}%</p>
            <div className='grid-x-right'>
            </div>
        </div>

        <p className="movie-description">Ticket Id: {id}</p>
        <p className="movie-description">Status: {status}</p>
        <p className="movie-description">Data da solicitação: {(new Date(requestedAt)).toLocaleDateString('pt-BR', { month: '2-digit', day: '2-digit', year: '2-digit' })}</p>
        <p className="movie-description">Analisado por: {evaluatedBy}</p>
        <p className="movie-description">Data da análise: {evaluatedAt ? (new Date(evaluatedAt)).toLocaleDateString('pt-BR', { month: '2-digit', day: '2-digit', year: '2-digit' }) : null}</p>
    </div> 
  )
}

export default StudentVoucherCard
