import React from 'react';
import './style/message.item.scss';

const MessageItem = ({userName, content, isMyMessage}) => {

  return (
    <div className={`message_body ${isMyMessage ? 'text-right': 'text-left'}`}>
      <div className="user_name">{userName}</div>
      <div className="message_body_content">{content}</div>
    </div>
  )
}

export {
  MessageItem
}
