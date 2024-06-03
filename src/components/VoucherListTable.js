import React from 'react'

const VoucherListTable = (props) => {
  
    return (
        <div>
            <table id="user-table" className='table-container'>
                <thead>
                    <tr>
                        <th><h1>Id voucher</h1></th>
                        <th><h1>Perc desconto</h1></th>
                        <th><h1>Status</h1></th>
                        <th><h1>Data criação</h1></th>
                        <th><h1>Data solicitação</h1></th>
                        <th><h1>Data análise</h1></th>
                        <th><h1>Analisado por</h1></th>
                        <th><h1>Nome aluno</h1></th>
                        <th><h1>Curso</h1></th>
                        <th><h1>Cod unidade</h1></th>
                        <th><h1>Unidade</h1></th>
                        <th><h1>Situacao acadêmica</h1></th>
                    </tr>
                </thead>

                <tbody>
                    {props.allVouchers.map((voucher) => (
                        <tr key={voucher._id}>
                            <td>{voucher._id}</td>
                            <td>{voucher.percDiscount}</td>
                            <td>{voucher.status}</td>
                            <td>{(new Date(voucher.createdAt)).toLocaleDateString('pt-BR', { month: '2-digit', day: '2-digit', year: '2-digit' })}</td>
                            <td>{voucher.requestedAt ? (new Date(voucher.requestedAt)).toLocaleDateString('pt-BR', { month: '2-digit', day: '2-digit', year: '2-digit' }): null}</td>
                            <td>{voucher.evaluatedAt ? (new Date(voucher.evaluatedAt)).toLocaleDateString('pt-BR', { month: '2-digit', day: '2-digit', year: '2-digit' }): null}</td>
                            <td>{voucher.evaluatedBy}</td>
                            <td>{voucher.studentVouchers ? voucher.studentVouchers.nmAluno : null}</td>
                            <td>{voucher.studentVouchers ? voucher.studentVouchers.dsEspecialidade : null}</td>
                            <td>{voucher.studentVouchers ? voucher.studentVouchers.cdUnidade : null}</td>
                            <td>{voucher.studentVouchers ? voucher.studentVouchers.dsUnidade : null}</td>
                            <td>{voucher.studentVouchers ? voucher.studentVouchers.dsSituacaoAcademica : null}</td>
                        </tr>
                    ))}
                </tbody>   
            </table>
        </div>
    )
}

export default VoucherListTable