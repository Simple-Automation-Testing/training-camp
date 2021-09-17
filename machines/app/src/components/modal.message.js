import React, {useState} from 'react'
import {Close} from './close';
import {MessageItem} from './message';

import './style/message.scss'

const MessageModal = ({name, messages = [], closeModal, sendMessage, userId}) => {
  const [messageContent, updateContent] = useState('');
  const [userName, updateName] = useState(name);
  const [fieldUserName, setName] = useState(name);
  console.log(fieldUserName)
  return (
    <div className="modal_wrapper message_modal">
      <div className="modal">
        <Close onClick={closeModal} />
        <div className="messages_list">
          {messages.map((message, index) => {
            const isMyMessage = userId === message.userId;
            console.log(userId, message.userId);
            return (<MessageItem key={index} isMyMessage={isMyMessage} {...message} />)
          })}
        </div>
        <div className="message_user_actions">
          <div className="modal_content message_username">
            <input
              onChange={({target: {value}}) => updateName(value)} disabled={fieldUserName}
              onBlur={() => setName(userName)} disabled={fieldUserName}
              value={fieldUserName}
            />
            <button>Оновити</button>
          </div>
          <div className="modal_content message_content">
            <input onChange={({target: {value}}) => updateContent(value)} value={messageContent} />
            <button onClick={
              () => {
                sendMessage({userName: fieldUserName, content: messageContent})
                updateContent('')
              }
            }>Відправити</button>
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
