import React from 'react'
import StudentVoucherCard from './StudentVoucherCard' 

const StudentVoucherList = ({totalStudentVouchers, studentVouchers}) => {
 
  return(
    <div>
       {totalStudentVouchers > 0 ? (
          <div className="movie-list-container grid grid-col-3">
          {studentVouchers.map((studentVoucher,index)=>(
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

