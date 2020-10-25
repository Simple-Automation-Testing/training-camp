import React from 'react';

const AdminUserForm = (props) => {
  const {onClick, actionMessage} = props;
  const {updateUsername, username = "Ім'я користувача"} = props;
  const {updateName, name = "Ім'я"} = props;
  const {updateEmail, email = "Імейл"} = props;
  const {updatePassword, password = "Пароль"} = props;
  const {updateIsAdmin, isAdmin} = props;
  const {error, message} = props;

  function cleanUp() {
    Array.from(document.querySelectorAll('.admin_user_form input')).forEach(inp => {
      if(inp.type === 'checkbox') {
        inp.checked = false
      } else {
        inp.value = ''
      }
    })
  }

  return (<div className="admin_user_form">
    <form>
      {error && <div className="alert alert-danger" role="alert">{error}</div>}
      {message && <div className="alert alert-success" role="alert">{message}</div>}
      <div className="form-group">
        <label >Ім'я користувача</label>
        <input type="text" className="form-control"
          placeholder={username}
          onChange={updateUsername}
          disabled={!updateUsername}
        />
      </div>
      <div className="form-group">
        <label >І'мя</label>
        <input type="text" className="form-control"
          placeholder={name}
          onChange={updateName}
          disabled={!updateName}
        />
      </div>
      <div className="form-group">
        <label >Імейл</label>
        <input type="text" className="form-control"
          placeholder={email}
          onChange={updateEmail}
          disabled={!updateName}
        />
      </div>
      <div className="form-group">
        <label >Пароль</label>
        <input type="text" className="form-control"
          placeholder={password}
          onChange={updatePassword}
          disabled={!updatePassword}
        />
      </div>
      <div className="form-group">
        <label >Адміністратор</label>
        {
          'isAdmin' in props ? <input type="checkbox" className="form-control"
            checked={!!isAdmin}
            disabled={true}
          /> : <input type="checkbox" className="form-control"
            onChange={updateIsAdmin}
            />
        }
      </div>
    </form>
    {onClick && <button type="button" className="btn btn-primary" onClick={() => {
      onClick(); cleanUp();
    }}>{actionMessage}</button>}
  </div>)
}

export {
  AdminUserForm
}
