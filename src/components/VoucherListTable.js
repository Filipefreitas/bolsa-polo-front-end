import React, { useContext } from 'react';
import VoucherContext from '../context/VoucherContext';
import Table from './Table';

const VoucherListTable = () => {
  const {allVouchers} = useContext(VoucherContext);

  const columns = [
    { key: '_id', header: 'Id voucher' },
    { key: 'percDiscount', header: 'Perc desconto' },
    { key: 'status', header: 'Status' },
    { key: 'createdAt', header: 'Data criação', render: (voucher) => (new Date(voucher.createdAt)).toLocaleDateString('pt-BR', { month: '2-digit', day: '2-digit', year: '2-digit' }) },
    { key: 'requestedBy', header: 'Solicitado por' },
    { key: 'requestedAt', header: 'Data solicitação', render: (voucher) => voucher.requestedAt ? (new Date(voucher.requestedAt)).toLocaleDateString('pt-BR', { month: '2-digit', day: '2-digit', year: '2-digit' }) : null },
    { key: 'evaluatedBy', header: 'Analisado por' },
    { key: 'evaluatedAt', header: 'Data análise', render: (voucher) => voucher.evaluatedAt ? (new Date(voucher.evaluatedAt)).toLocaleDateString('pt-BR', { month: '2-digit', day: '2-digit', year: '2-digit' }) : null },
    { key: 'studentVouchers.nmAluno', header: 'Nome aluno', render: (voucher) => voucher.studentVouchers ? voucher.studentVouchers.nmAluno : null },
    { key: 'studentVouchers.dsEspecialidade', header: 'Curso', render: (voucher) => voucher.studentVouchers ? voucher.studentVouchers.dsEspecialidade : null },
    { key: 'studentVouchers.cdUnidade', header: 'Cod unidade', render: (voucher) => voucher.studentVouchers ? voucher.studentVouchers.cdUnidade : null },
    { key: 'studentVouchers.dsUnidade', header: 'Unidade', render: (voucher) => voucher.studentVouchers ? voucher.studentVouchers.dsUnidade : null },
    { key: 'studentVouchers.dsSituacaoAcademica', header: 'Situacao acadêmica', render: (voucher) => voucher.studentVouchers ? voucher.studentVouchers.dsSituacaoAcademica : null },
  ];

  return <Table columns={columns} data={allVouchers} />;
};

export default VoucherListTable;
