import React, {Component} from 'react';
import {Link, Red} from 'react-router-dom';
import {connect} from 'react-redux';
import {AdminUserForm} from './components/admin.user.form';
import {getItem} from '../helpers/local.storage';
import {adminCreateUser, adminGetUserList} from '../api'

class AdminPanel extends Component {

  state = {
    currendItem: null,
    newUser: {
      username: null,
      email: null,
      password: null,
      name: null,
      isAdmin: false
    },
    registerError: null,
    userList: null
  }

  closeModal = () => {
    this.setState({
      currendItem: null
    })
  }

  openCreateNewUser = () => {
    this.setState({...this.state, view: 'newUser'})
  }

  createNewUser = () => {
    const admin = getItem('user');
    const canBeCreated = Object
      .keys(this.state.newUser)
      .every(k => k === 'isAdmin' ? true : this.state.newUser[k])
    if(canBeCreated) {
      adminCreateUser(admin, this.state.newUser)
        .then(() => {
          // TODO
        })
    }
  }

  updateNewUserField = (field) => ({target: {value, checked}}) => {
    const updateData = {
      ...this.state, newUser: {...this.state.newUser, [field]: field === 'isAdmin' ? checked : value}
    }
    this.setState(updateData)
  }

  openUserList = () => {
    const admin = getItem('user');
    adminGetUserList(admin).then((userList) => {
      if(userList.error) {
        this.setState({...this.state, error: userList.error});
      }
      this.setState({...this.state, view: 'userList', userList});
    })
  }

  upenUserDetails = (username) => {
    const {userList} = this.state
    const currentItem = userList.find(i => i.username === username);
    this.setState({...this.state, currentItem})
  }

  render() {
    const {view, registerError, userList, currentItem} = this.state;
    const user = getItem('user');
    const isAdmin = getItem('isAdmin');

    const renderUserList = () => {
      return userList.map(({username}) => (
        <div className="user_item">
          <div className="user_item_username">{'\u00A0\u00A0\u00A0'}{username}{'\u00A0'}</div>
          <div className="button_details"><button onClick={() => this.upenUserDetails(username)} className="btn btn-default">Деталі</button></div>
        </div>
      ))
    }

    const renderUserDetails = () => {
      const {currentItem} = this.state;
      return <AdminUserForm {...currentItem} />
    }

    return (
      <div id="admin_page">
        {!isAdmin && <Redirect to="/tables" />}
        <div className="header">
          <h3>Кабінет адміністратора, Привіт {user.username}</h3>
          <Link to='/tables'><button className="btn btn-primary">До таблиць</button></Link>
          <Link to='/analytics'><button className="btn btn-primary">До аналітики</button></Link>
          <Link to='/combaines'><button className="btn btn-primary">До комбайнів</button></Link>
          <button className="btn btn-primary logout" onClick={() => {
            localStorage.clear()
            window.history.go(0)
          }}>Вийти</button>
        </div>

        <br />
        <div className="view_toggler">
          <button className="btn btn-default" onClick={this.openCreateNewUser}>Створити нового користувача</button>
          <button className="btn btn-default" onClick={this.openUserList}>Список користувачів</button>
        </div>
        {
          view === 'newUser' &&
          <div className="admin_new_user">
            <AdminUserForm
              error={registerError}
              onClick={this.createNewUser} actionMessage="Створити нового користувача"
              updateUsername={this.updateNewUserField('username')}
              updateName={this.updateNewUserField('name')}
              updateEmail={this.updateNewUserField('email')}
              updatePassword={this.updateNewUserField('password')}
              updateIsAdmin={this.updateNewUserField('isAdmin')}
            />
          </div>
        }
        {
          view === 'userList' && <div className="admin_user_list_root">
            <div className="list">{renderUserList()}</div>
            {currentItem && <div className="details">{renderUserDetails()}</div>}
          </div>
        }
      </div>
    )
  }
}

export default connect(({table}) => table)(AdminPanel)
