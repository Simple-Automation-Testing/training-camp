import React, {Component} from 'react'
import classnames from 'classnames'

class InitialForm extends Component {

  state = {error: null}

  handleInput = (field) => ({target: {value}}) =>
    this.setState({[field]: value})

  handleClick = async () => {
    const {actionClick} = this.props;
    const {error, ...rest} = this.state;
    const result = await actionClick(rest)
    if(result && result.error) {
      this.setState({...this.state, error: result.error});
    }
  }

  render() {
    const {error} = this.state
    const {titleMessage = 'Вхід в систему', actionMessage = 'Увійти', isRegister, children, className} = this.props
    const classNames = classnames('modal_wrapper', className);
    return (
      <div className={classNames} >
        <div className="modal">
          <h1>{titleMessage}</h1>
          <br />
          {children}
          {error && <div className="alert alert-danger" role="alert">{error}</div>}
          <form>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Ім'я користувача</label>
              <input className="form-control" placeholder="Ім'я користувача" onChange={this.handleInput('username')} />
            </div>
            {isRegister &&
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">І'мя</label>
                <input type="text" className="form-control" placeholder="Ім'я" onChange={this.handleInput('name')} />
              </div>
            }
            {isRegister &&
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Імейл</label>
                <input type="text" className="form-control" placeholder="Імейл" onChange={this.handleInput('email')} />
              </div>
            }
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Пароль</label>
              <input type="password" className="form-control" placeholder="пароль" onChange={this.handleInput('password')} />
            </div>

          </form>
          <button type="button" className="btn btn-primary" onClick={this.handleClick}>{actionMessage}</button>
        </div>
      </div>
    )
  }
}

export {
  InitialForm
}
