import React, {useContext} from 'react'
import VoucherContext from '../context/VoucherContext';

const Modal = () => {

    const {modal, hideModal} = useContext(VoucherContext);

    return (
        <div className={modal.visible === true ? "" : "hide"} onClick={()=>{
            hideModal()
        }}>

          <div className="modal" >
              <div className="modal-container">{modal.msg}</div>
          </div>
    
        </div>
    )
}

export default Modal
