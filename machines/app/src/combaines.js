import React, {Component} from "react";
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import {getItem, setItem} from '../helpers/local.storage';
import {getCombainesApi, getCombainesCountApi} from '../api';

const styleScroll = {
  margin: '4px, 4px',
  paddingTop: '100px',
  width: '100%',
  overfloX: 'auto',
  textAlign: 'justify'
}

class CombainsTable extends Component {
  state = {
    items: [],
    cursor: 0,
    machineCount: 0
  };

  componentDidMount() {
    document.title = 'Механізація Тваринництва - Комбайни'
  }

  UNSAFE_componentWillMount() {
    getCombainesCountApi()
      .then((machineCount) => this.setState({...this.state, machineCount}))
      .then(() => getCombainesApi('?limit=20'))
      .then((combaines) => this.setState({items: combaines, cursor: 20}))
  }

  fetchMoreData = () => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    const {cursor, } = this.state
    getCombainesApi(`?limit=${cursor + 20}`)
      .then((combaines) => this.setState({items: combaines, cursor: cursor + 20}))
  };

  renderCombaine = (item, index) => {
    return (<div style={{display: 'flex', border: '4px double black', textAlign: 'center'}} key={index} className="dynamic_table_row">
      <div style={{width: '20%'}} className="active title">{item.machine_title}</div>
      <div style={{width: '20%'}} className="active">{item.weight}</div>
      <div style={{width: '20%'}} className="active">{item.height}</div>
      <div style={{width: '20%'}} className="active">{item.class}</div>
      <div style={{width: '20%'}} className="active price">{item.price}</div>
    </div>)
  }

  render() {
    const {items, machineCount} = this.state;
    const hasMore = items.length !== machineCount;
    const user = getItem('user')
    const isAdmin = getItem('isAdmin')
    return (
      <div id="combains_page">
        <div className="header" style={{position: 'fixed', width: '100%'}}>
          <div>
            <h3>Таблиці, Привіт {user.username}</h3>
            <Link to="/analytics" ><button className="btn btn-primary" onClick={() => setItem('page', '/analytics')}> До аналітики</button></Link>
            <Link to='/tables'><button className="btn btn-primary" onClick={() => setItem('page', '/tables')}>До таблиць</button></Link>
            {isAdmin && <Link to="/admin" target="_blank" rel="noopener noreferrer"><button className="btn btn-primary" onClick={() => setItem('page', '/admin')}>До адмін кабінету</button></Link>}
            <button className="btn btn-primary logout" onClick={() => {
              localStorage.clear()
              window.history.go(0)
            }}>Вийти</button>
          </div>
        </div>

        <div>
          <InfiniteScroll
            onScroll={(e) => {
              console.log('here');
              e.stopPropagation()
            }}
            dataLength={this.state.items.length}
            next={this.fetchMoreData}
            style={styleScroll}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
          >
            {<div className="dynamic_table">
              <div style={{display: 'flex', paddingTop: '100px', textAlign: 'center'}} className="dynamic_table_header">
                <div style={{width: '20%'}} className="active title">Виробник та марка</div>
                <div style={{width: '20%'}} className="active">Вага, кг</div>
                <div style={{width: '20%'}} className="active">Висота, СМ(ДМ)</div>
                <div style={{width: '20%'}} className="active">Клас СМ</div>
                <div style={{width: '20%'}} className="active price">Ціна, грн</div>
              </div>
              <div className="dynamic_table_body">
                {items.map((item, index) => this.renderCombaine(item, index))}
              </div>
            </div>}
          </InfiniteScroll>
        </div>
      </div>
    );
  }
}

export default connect(({combains}) => combains)(CombainsTable)