import {getRandomString} from 'sat-utils'
import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {InitialForm} from './src/action.form'
import {InitialFormModern} from './src/action.form.new';
import {loginApi, registerApi, userIsAdminApi, startMessagesSession, sendMessage, getMessagesList} from './api'
import {setItem, getItem} from './helpers/local.storage'
import {MessageModal} from './src/components/modal.message'

const ActionForm = process.env.FORM === 'modern' ? InitialFormModern : InitialForm;
let intervalItem = null;


class Root extends Component {
  UNSAFE_componentWillMount() {
    const user = getItem('user');
    const page = getItem('page');
    const userId = getItem('userId');

    if(!userId) {
      setItem('userId', 'unregistered_user');
    }

    if(user) {
      this.setState({...this.state, user, page})
    }
  }

  state = {
    page: null,
    user: null,
    view: 'login',
    messageForm: null
  }

  sendMessage = async ({userName, content}) => {
    const userId = getItem('userId');
    const sessionId  = getItem('sessionId')
    const id = getRandomString(15);
    const replyUserId = null;
    const messages = await sendMessage({
      sessionId, message: {
        userId,
        id,
        replyUserId,
        userName,
        content,
      }
    });
    this.setState({...this.state, messages});
  }

  refreshMessages = async () => {
    const {startAutoRefresh} = this.setState;
    if(startAutoRefresh) {
      clearInterval(intervalItem)
      this.setState({...this.state, startAutoRefresh: !startAutoRefresh});
    } else {
      this.setState({...this.state, startAutoRefresh: !startAutoRefresh});

      intervalItem = setInterval(async () => {
        const sessionId = getItem('sessionId');
        const messages = await getMessagesList({sessionId});
        this.setState({...this.state, messages});
     }, 500)
    }
  }

  updateView = (view) => {
    this.setState({...this.state, view})
  }

  closeMessageForm = () => {
    this.setState({...this.state, messageForm: null});
  }

  openMessageForm = async () => {
    this.setState({...this.state, messageForm: true});
    const {sessionId} = await startMessagesSession();
    setItem('sessionId', sessionId)
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
    if(result) {
      const isAdmin = await userIsAdminApi(user)
      setItem('user', user);
      setItem('isAdmin', isAdmin);
      setItem('userId', result.userId);
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
    const {user, view, page = '/tables', messageForm, messages} = this.state
    const redirectTo = page ? page : '/tables'
    const userId = getItem('userId');
    return (
      <div id="main_page">
        {messageForm && <MessageModal
          closeModal={this.closeMessageForm}
          messages={messages}
          sendMessage={this.sendMessage}
          userId={userId}
          refresh={this.refreshMessages}
        />}
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
        <div><button className="btn btn-secondary chat_button" onClick={this.openMessageForm} >Надіслати відгук </button></div>
      </div>
    )
  }
}

export default Root