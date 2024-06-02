import React from 'react';

const StudentVoucherCard = (props) => {

    return (
      <div className="movie-container">
        <div className="grid grid-col-2 movie-top-area">
            <p className="">{props.percDiscount}%</p>
            <div className='grid-x-right'>
            </div>
        </div>

        <p className="movie-description">Ticket Id: {props.id}</p>
        <p className="movie-description">Status: {props.status}</p>
        <p className="movie-description">Data da solicitação: {(new Date(props.requestedAt)).toLocaleDateString('pt-BR', { month: '2-digit', day: '2-digit', year: '2-digit' })}</p>
        <p className="movie-description">Analisado por: {props.evaluatedBy}</p>
        <p className="movie-description">Data da análise: {props.evaluatedAt ? (new Date(props.evaluatedAt)).toLocaleDateString('pt-BR', { month: '2-digit', day: '2-digit', year: '2-digit' }) : null}</p>
    </div> 
  )
}

export default StudentVoucherCard
