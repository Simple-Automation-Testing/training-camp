import React, {Component} from 'react';
import classnames from 'classnames';
import {DropDownList} from './components/drop.down.list';

class InitialFormModern extends Component {

  state = {
    error: null,
    isHuman: false,
    userType: 'Тип користувача'
  }

  handleSelect = (userType) => this.setState({...this.state, userType})

  handleInputRobot = ({target: {value}}) => this.setState({...this.state, isHuman: value})

  handleInput = (field) => ({target: {value}}) => this.setState({...this.state, [field]: value})

  handleClick = async () => {
    const {actionClick, isRegister} = this.props;
    const {error, isHuman, ...rest} = this.state;

    if(isRegister && (!rest.zipCode || !rest.address)) {
      this.setState({...this.state, error: 'Усі поля повинні бути заповнені'})
      return
    }

    const result = await actionClick(rest)
    if(result && result.error) {
      this.setState({...this.state, error: result.error});
    }
  }

  render() {
    const {error, userType} = this.state
    const {titleMessage = 'Вхід в систему', actionMessage = 'Увійти', isRegister = false, children, className} = this.props
    const classNames = classnames('modal_wrapper', className);
    return (
      <div className={classNames} >
        <div className="modal_next">
          <h1>{titleMessage}</h1>
          <br />
          {children}
          {error && <div className="alert alert-danger" role="alert">{error}</div>}
          <form>
            <div className="form-group">
              <label className="field-title" htmlFor="exampleInputEmail1">Ім'я користувача</label>
              <input type="text" className="form-control new-form-field" placeholder="Ім'я користувача" onChange={this.handleInput('username')} />
            </div>
            {isRegister &&
              <div className="form-group">
                <label className="field-title" >І'мя</label>
                <input type="text" className="form-control new-form-field" placeholder="Ім'я" onChange={this.handleInput('name')} />
              </div>
            }
            {isRegister &&
              <div className="form-group">
                <label className="field-title" >Імейл</label>
                <input type="text" className="form-control new-form-field" placeholder="Імейл" onChange={this.handleInput('email')} />
              </div>
            }
            {isRegister &&
              <div className="form-group">
                <label className="field-title" >Адреса</label>
                <input type="text" className="form-control new-form-field" placeholder="Адреса" onChange={this.handleInput('address')} />
              </div>
            }
            {isRegister &&
              <div className="form-group">
                <label className="field-title" >Поштовий індекс</label>
                <input type="text" className="form-control new-form-field" placeholder="Індекс" onChange={this.handleInput('zipCode')} />
              </div>
            }
            {isRegister &&
              <div className="form-group">
                <label className="field-title" >Тип користувача</label>
                <DropDownList
                  onSelect={this.handleSelect}
                  currentSelected={userType}
                  options={[
                    {option: 'Користувач'},
                    {option: 'Закупщик'}
                  ]}
                />

              </div>
            }
            <div className="form-group">
              <label className="field-title" >Пароль</label>
              <input type="password" className="form-control new-form-field" placeholder="пароль" onChange={this.handleInput('password')} />
            </div>
            {!isRegister &&
              <div className="robot-box">
                <label className="field-title" >Я не робот</label>
                <input type="checkbox" className="form-control new-form-field" onChange={this.handleInputRobot} />
              </div>}
          </form>
          <button type="button" className="btn btn-primary submit-button" onClick={this.handleClick}>{actionMessage}</button>
        </div>
      </div>
    )
  }
}

export {
  InitialFormModern
}
