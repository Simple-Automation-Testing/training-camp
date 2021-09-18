import React, {useState} from 'react'
import {Close} from './close';
import {MessageItem} from './message';

import './style/message.scss'

const MessageModal = ({name, userId, messages, closeModal, sendMessage, refresh, sessions, chooseSession}) => {
  const [messageContent, updateContent] = useState('');
  const [userName, updateName] = useState(name);
  const [fieldUserName, setName] = useState(name);
  return (
    <div className="modal_wrapper message_modal">
      <div className="modal">
        <Close onClick={closeModal} />
        <div className="messages_list">
          {sessions && sessions.map && sessions.map((sessionItem, index) => {
            return <div className="text-left" key={index}><button onClick={() => chooseSession(sessionItem.sessionId)}>
              <span>{sessionItem.userName}{'\u00A0\u00A0\u00A0'}</span>
              <span>{sessionItem.sessionId}</span>
            </button> </div>
          })}
          {messages && messages.map && messages.map((message, index) => {
            const isMyMessage = userId === message.userId;
            return (<MessageItem key={index} isMyMessage={isMyMessage} {...message} />)
          })}
        </div>
        <div className="message_user_actions">
          <div className="modal_content message_username input-group mb-3">
            <label htmlFor="feedback_name">Ім'я</label>
            <input className="form-control" id="feedback_name" aria-describedby="emailHelp" placeholder="Ім'я"
              onChange={({target: {value}}) => updateName(value)} disabled={fieldUserName}
              onBlur={() => setName(userName)} disabled={fieldUserName}
              value={fieldUserName}
            />
          </div>
          <div className="modal_content message_content input-group mb-3">
          <label htmlFor="feedback_content">Повідомлення</label>
            <input
              id="feedback_content" className="form-control"
              onChange={({target: {value}}) => updateContent(value)} value={messageContent}
            />
            <div className="input-group-append">
              <button className="btn btn-primary submit-button" onClick={
                () => {
                  sendMessage({userName: fieldUserName, content: messageContent})
                  updateContent('')
                }
              }>Відправити</button>
               <button className="btn btn-primary submit-button" onClick={refresh}>Оновити</button>
            </div>
          </div>
        </div>
        <div>
        </div>
        </div>
      </div>
    )
}

export {
  MessageModal
}
