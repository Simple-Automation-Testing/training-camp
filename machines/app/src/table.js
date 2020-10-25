import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {MachineModal} from './components/modal.machine'
import {
  filterName,
  filterVolume,
  filterPrice,
  filterDrop,
  sortBrandAZ,
  sortBrandZA,
  sortPriceFormHight,
  sortPriceFormLow,
  sortWorkVolumeLow,
  sortWorkVolumeHight,
  initMachines
} from '../reducer/machines'

import {getMachinesApi, addMachineApi, removeMachineApi} from '../api'
import {getItem} from '../helpers/local.storage'

class SternMachineTable extends Component {

  UNSAFE_componentWillMount() {
    const {dispatch} = this.props
    getMachinesApi()
      .then((machines) => dispatch(initMachines(machines)))
  }

  state = {
    name: '',
    volume: '',
    price: '',
    machine: {},
    currendItem: null,
    sorting: {
      brand: '',
      work_volume: '',
      L: '',
      W: '',
      weight: '',
      tractor_power: '',
      price: ''
    }
  }

  handleChangeFilter = (type) => ({target: {value}}) => {
    this.setState({
      [type]: value
    })
  }

  handleAdd = (type) => ({target: {value}}) => {
    this.setState({
      machine: {
        ...this.state.machine,
        [type]: value
      }
    })
  }

  handleCollectData = () => {
    const requiredFields = ['work_volume', 'price', 'brand'];
    const {machine} = this.state
    const {dispatch} = this.props

    if(!requiredFields.every(k => Object.keys(machine).includes(k))) {
      console.error('Required field are ', 'work_volume', 'price', 'brand')
      return;
    }

    for(const prop in machine) {
      if(machine[prop].length < 1) {
        return;
      }
    }

    addMachineApi(machine)
      .then(machines => {
        dispatch(initMachines(machines));
        this.clearAddMachineFields()
      })
  }

  initFilter = () => {
    const {dispatch} = this.props
    const {name, volume, price} = this.state
    if(!!name) {
      dispatch(filterName({value: name}))
    } else if(!!volume) {
      dispatch(filterVolume({value: volume}))
    } else if(!!price) {
      dispatch(filterPrice({value: price}))
    } else if(!price && !volume && !name) {
      dispatch(filterDrop())
    }
  }

  startRezieFilterButton = (event) => {
    event.preventDefault()
    event.stopPropagation()

    const {clientX: startX} = event
    const target = event.target

    const {x, width} = target.getBoundingClientRect()

    const mouseMove = (event) => {
      const x = event.clientX - startX
      target.style.width = `${width + x}px`
    }

    const mouseUp = () => {
      document.removeEventListener('mousemove', mouseMove)
      document.removeEventListener('mouseup', mouseUp)
    }

    document.addEventListener('mousemove', mouseMove)
    document.addEventListener('mouseup', mouseUp)
  }

  sortMachines = (sortArea) => {
    const {dispatch} = this.props

    const {sorting: {brand, price, work_volume}} = this.state

    switch(sortArea) {
      case 'brand': {
        if(brand === 'low') {
          this.setState({sorting: {brand: 'hight'}})
          dispatch(sortBrandAZ())
        } else if(brand === 'hight') {
          this.setState({sorting: {brand: 'low'}})
          dispatch(sortBrandZA())
        } else {
          this.setState({sorting: {brand: 'hight'}})
          dispatch(sortBrandAZ())
        }
        return
      }
      case 'price': {
        if(price === 'low') {
          this.setState({sorting: {price: 'hight'}})
          dispatch(sortPriceFormHight())
        } else if(price === 'hight') {
          this.setState({sorting: {price: 'low'}})
          dispatch(sortPriceFormLow())
        } else {
          this.setState({sorting: {price: 'hight'}})
          dispatch(sortPriceFormHight())
        }
        return
      }
      case 'work_volume': {
        if(work_volume === 'low') {
          this.setState({sorting: {work_volume: 'hight'}})
          dispatch(sortWorkVolumeLow())
        } else if(work_volume === 'hight') {
          this.setState({sorting: {work_volume: 'low'}})
          dispatch(sortWorkVolumeHight())
        } else {
          this.setState({sorting: {work_volume: 'hight'}})
          dispatch(sortWorkVolumeLow())
        }
        return
      }
    }
  }

  renderItem = (item) => {
    this.setState({
      currendItem: item
    })
  }

  closeModal = () => {
    this.setState({
      currendItem: null
    })
  }

  handleRemove = (machine) => {
    const {dispatch} = this.props
    removeMachineApi(machine)
      .then(machines => dispatch(initMachines(machines)))
      .then(this.closeModal.bind(this))
  }

  clearAddMachineFields = () => {
    Array.from(document.querySelectorAll('.add_machine input')).forEach(inp => {
      inp.value = ''
    })
  }

  render() {
    const {currendItem} = this.state
    const {sternMachines} = this.props
    // this should be refactored
    const isAdmin = getItem('isAdmin')
    const user = getItem('user')
    const table = sternMachines.map((item, index) => {
      return (
        <tr key={index} onClick={() => this.renderItem(item)}>
          <td style={{width: '14%'}} className="active brand">{item.brand}</td>
          <td style={{width: '14%'}} className="active volume">{item.work_volume}</td>
          <td style={{width: '14%'}} className="active">{item.L}</td>
          <td style={{width: '14%'}} className="active">{item.W}</td>
          <td style={{width: '14%'}} className="active">{item.weight}</td>
          <td style={{width: '14%'}} className="active">{item.tractor_power}</td>
          <td style={{width: '14%'}} className="active price">{item.price}</td>
        </tr>
      )
    })
    return (
      <div id="table_page">
        {
          currendItem &&
          <MachineModal item={currendItem} closeModal={this.closeModal} >
            {isAdmin && <button className="btn btn-danger" onClick={() => this.handleRemove(currendItem)}>Видалити машину</button>}
          </MachineModal>
        }
        <div className="header">
          <h3>Таблиці, Привіт {user.username}</h3>
          <Link to="/analytics"><button className="btn btn-primary">До аналітики</button></Link>
          <Link to='/combaines'><button className="btn btn-primary">До комбайнів</button></Link>
          {isAdmin && <Link to="/admin"><button className="btn btn-primary">До адмін кабінету</button></Link>}
          <button className="btn btn-primary logout" onClick={() => {
            localStorage.clear()
            window.history.go(0)
          }}>Вийти</button>
        </div>
        <table style={{width: '100%'}} className="table filtering">
          <tbody >
            <tr>
              <td style={{width: '6%'}}><input onChange={this.handleChangeFilter('name')} style={{width: '100%'}} ref="brand"
                placeholder="Виробник" /></td>
              <td style={{width: '7%'}}><input onChange={this.handleChangeFilter('volume')} style={{width: '100%'}} ref="work_vlolume"
                placeholder="Робочий об'єм" /></td>
              <td style={{width: '7%'}}><input onChange={this.handleChangeFilter('price')} style={{width: '100%'}} ref="price" placeholder="Ціна" /></td>
            </tr>
          </tbody>
        </table >
        <button className="btn btn-default" onClick={this.initFilter} style={{width: '100px'}} onMouseDown={this.startRezieFilterButton}>Фільтрувати</button>
        <br></br>
        <div className="machies_list_section">
          <h3 className="text-center">Основні показники машин для роздавання кормів</h3>
          <table style={{width: '100%'}} className="table-bordered text-center machines_list">
            <thead>
              <tr className="success">
                <td onClick={() => this.sortMachines('brand')} style={{width: '14%', height: '40px'}}>Виробник</td>
                <td onClick={() => this.sortMachines('work_volume')} style={{width: '14%'}}>Робочий об'єм, М</td>
                <td onClick={() => this.sortMachines('L')} style={{width: '14%'}}>Довжина, М</td>
                <td onClick={() => this.sortMachines('W')} style={{width: '14%'}}>Ширина, М</td>
                <td onClick={() => this.sortMachines('weight')} style={{width: '14%'}}>Маса, КГ</td>
                <td onClick={() => this.sortMachines('tractor_power')} style={{width: '14%'}}>Потужність трактора, кВт</td>
                <td onClick={() => this.sortMachines('price')} style={{width: '14%'}}>Ціна, грн</td>
              </tr>
            </thead>
            <tbody>
              {table}
            </tbody>
          </table>
        </div>
        {
          isAdmin &&
          <div className="add_machine">
            <table style={{width: '100%'}} className="table-bordered text-center">
              <thead>
                <tr className="success inputs">
                  <td style={{width: '14%', height: '40px'}}>
                    <input onChange={this.handleAdd('brand')} placeholder="Виробник" /></td>
                  <td style={{width: '14%'}}>
                    <input onChange={this.handleAdd('work_volume')} placeholder="Робочий об'єм" /></td>
                  <td style={{width: '14%'}}>
                    <input onChange={this.handleAdd('L')} placeholder="Довжина" /></td>
                  <td style={{width: '14%'}}>
                    <input onChange={this.handleAdd('W')} placeholder="Ширина" /></td>
                  <td style={{width: '14%'}}>
                    <input onChange={this.handleAdd('weight')} placeholder="Маса" />
                  </td>
                  <td style={{width: '14%'}}>
                    <input onChange={this.handleAdd('tractor_power')} placeholder="Потужність трактора" />
                  </td>
                  <td style={{width: '14%'}}>
                    <input onChange={this.handleAdd('price')} placeholder="Ціна" />
                  </td>
                </tr>
              </thead>
            </table>
            <button className="btn btn-success" onClick={this.handleCollectData}>Додати</button>
          </div>
        }
      </div>
    )
  }
}

export default connect(({table}) => table)(SternMachineTable)
