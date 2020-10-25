import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {MachineModal} from './components/modal.machine'
import {getItem} from '../helpers/local.storage'

class Analytics extends Component {

  state = {
    currendItem: null
  }

  closeModal = () => {
    this.setState({
      currendItem: null
    })
  }

  getVorkVolumeRange = () => {
    const {sternMachines} = this.props
    const WVmin = sternMachines.reduce((acc, {work_volume}) => {
      if(!acc) {acc = work_volume}
      else if(acc > work_volume) {acc = work_volume}
      return acc
    }, null)
    const WVmax = sternMachines.reduce((acc, {work_volume}) => {
      if(!acc) {acc = work_volume}
      else if(acc < work_volume) {acc = work_volume}
      return acc
    }, null)

    return {WVmin, WVmax}
  }

  findItemBy = (p) => (v) => {
    const {sternMachines} = this.props
    const currendItem = sternMachines.find(i => i[p] === v)
    this.setState({currendItem})
  }

  getPriceRange = () => {
    const {sternMachines} = this.props
    const Pmin = sternMachines.reduce((acc, {price}) => {
      if(!acc) {acc = price}
      else if(acc > price) {acc = price}
      return acc
    }, null)
    const Pmax = sternMachines.reduce((acc, {price}) => {
      if(!acc) {acc = price}
      else if(acc < price) {acc = price}
      return acc
    }, null)
    return {Pmin, Pmax}
  }

  render() {
    const {currendItem} = this.state;
    const {sternMachines} = this.props;
    const {WVmax, WVmin} = this.getVorkVolumeRange();
    const {Pmax, Pmin} = this.getPriceRange();
    const user = getItem('user');
    const isAdmin = getItem('isAdmin');

    return (
      <div id="analytics_page">
        {currendItem && <MachineModal item={currendItem} closeModal={this.closeModal} />}
        <div className="header">
          <h3>Аналітика, Привіт {user.username}</h3>
          <Link to='/tables'><button className="btn btn-primary">До таблиць</button></Link>
          <Link to='/combaines'><button className="btn btn-primary">До комбайнів</button></Link>
          {isAdmin && <Link to="/admin"><button className="btn btn-primary">До адмін кабінету</button></Link>}
          <button className="btn btn-primary logout" onClick={() => {
            localStorage.clear()
            window.history.go(0)
          }}>Вийти</button>
        </div>
        <br />
        <div className="analytics_information">
          <div className="analytics_info_field alert alert-primary quantity" role="alert">
            Кількість машин в базі данних {sternMachines.length}
          </div>
          <div className="analytics_info_field alert alert-primary work_volume" role="alert">
            Робочий об'єм машин від
          <span className="interactable_text" onClick={() => this.findItemBy('work_volume')(WVmin)}> {WVmin} </span>  до
          <span className="interactable_text" onClick={() => this.findItemBy('work_volume')(WVmax)}> {WVmax} </span>
          </div>
          <div className="analytics_info_field alert alert-primary price" role="alert">
            Ціни від
          <span className="interactable_text" onClick={() => this.findItemBy('price')(Pmin)}> {Pmin} </span>  до
          <span className="interactable_text" onClick={() => this.findItemBy('price')(Pmax)}> {Pmax} </span>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(({table}) => table)(Analytics)
