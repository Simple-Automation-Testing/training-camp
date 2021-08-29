import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {InitialForm} from './src/action.form'
import {InitialFormModern} from './src/action.form.new';
import {loginApi, registerApi, userIsAdminApi} from './api'
import {setItem, getItem} from './helpers/local.storage'


// console.log(process.env.FORM)
const ActionForm = process.env.FORM === 'modern' ? InitialFormModern : InitialForm;


class Root extends Component {

  UNSAFE_componentWillMount() {
    const user = getItem('user')
    const page = getItem('page')
    console.log(window.location.pathname, '0 !!!!!!!!!!!!!!!!!!!!');
    if(user) {
      this.setState({...this.state, user, page})
    }
  }

  componentWillMount() {
    console.log(window.location.pathname, '0 !!!!!!!!!!!!!!!!!!!!');
  }

  state = {
    page: null,
    user: null,
    view: 'login'
  }

  updateView = (view) => {
    this.setState({...this.state, view})
  }

  login = (user) => {
    this.setState({user})
  }

  loginFormAction = async (user) => {
    const err = {error: 'Неможливо авторизуватися, перевірте ваші данні'};
    const canTryLogin = user.username && user.password;

    if(!canTryLogin) {
      return err;
    }

    const result = await loginApi(user)
    if(result === true) {
      const isAdmin = await userIsAdminApi(user)
      setItem('user', user);
      setItem('isAdmin', isAdmin);
      this.login(user);
    } else {
      return err;
    }
  }

  registerFormAction = async (user) => {
    const err = {error: 'Користувач не може бути зарегістрований'};
    const canTryRegister = user.username && user.password && user.email && user.name;
    if(!canTryRegister) {
      return err;
    }
    const result = await registerApi(user)
    if(result === true) {
      const {username, password} = user
      setItem('user', {username, password})
      this.login({username, password})
    } else {
      return err;
    }
  }

  renderMainPageHeader = () => {
    return (<div className="main_header">
      <div className="user_buttons">
        <button className="btn btn-secondary" onClick={() => this.updateView('login')}>Увійти</button>
        <button className="btn btn-secondary" onClick={() => this.updateView('register')}>Зареєструватися</button>
      </div>
    </div>)
  }

  render() {
    const {user, view, page = '/tables'} = this.state
    const redirectTo = page ? page : '/tables'
    return (
      <div id="main_page">
        {user && <Redirect to={redirectTo} />}
        {this.renderMainPageHeader()}
        {
          view === 'login'
            ? <ActionForm
              className="login_form"
              actionClick={this.loginFormAction}
            />
            : <ActionForm
              className="registration_form"
              isRegister={true}
              actionClick={this.registerFormAction}
              titleMessage={'Регістрація'}
              actionMessage={'Зареєструватися'}
            />
        }
      </div>
    )
  }
}

export default Root