import React from 'react'

const Modal = (props) => {

    return (
        <div className={props.modal.visible === true ? "" : "hide"} onClick={()=>{
            props.onHide()
        }}>

          <div className="modal" >
              <div className="modal-container">{props.modal.msg}</div>
          </div>
    
        </div>
    )
}

export default Modal
