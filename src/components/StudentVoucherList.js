import React from 'react'
import {useEffect,useState} from "react";
import StudentVoucherCard from './StudentVoucherCard' 

const StudentVoucherList = (props) => {
 
  console.log(`student voucher list component: ${props.totalStudentVouchers}`);

  return(
    <div>
       {props.totalStudentVouchers > 0 ? (
          <div>
          {props.studentVouchers.map((studentVoucher,index)=>(
            <StudentVoucherCard key={index} id={studentVoucher._id} 
            percDiscount={studentVoucher.percDiscount}
            status={studentVoucher.status}
            requestedAt={studentVoucher.requestedAt}
            evaluatedAt={studentVoucher.evaluatedAt}
            />))}
        </div>  
        ) : (
        <div>Aluno não possui vouchers</div>
        )
      }
    </div>       
  )
}

export default StudentVoucherList

