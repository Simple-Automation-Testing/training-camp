import React, {Component} from 'react'
import {Close} from './close'

class MachineModal extends Component {
  render() {
    const {item, closeModal, children} = this.props
    return (
      <div className="modal_wrapper">
        <div className="modal">
          <Close onClick={closeModal} />
          <div><h1>{item.brand}</h1> </div>
          <div className="modal_content p">Виробник                 <span>{item.brand}</span></div>
          <div className="modal_content p">Робочий об'єм            <span>{item.work_volume}</span></div>
          <div className="modal_content p">Довжина                  <span>{item.L}</span></div>
          <div className="modal_content p">Ширина                   <span>{item.W}</span></div>
          <div className="modal_content p">Вага                     <span>{item.weight}</span> кг</div>
          <div className="modal_content p">Тягове зусилля трактора  <span>{item.tractor_power}</span></div>
          <div className="modal_content p">Ціна                     <span>{item.price}</span></div>
          <div>{children}</div>
        </div>
      </div>
    )
  }
}

export {
  MachineModal
}
