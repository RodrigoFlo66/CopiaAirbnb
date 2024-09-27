import React from 'react';
import { Avatar } from 'antd';
import { MessageOutlined, UserOutlined } from '@ant-design/icons';
import './chatMessageStyles.css';

function ChatMessage(props) {
  return (
    <div className={`chat-message-flex-container ${props.user ? 'chat-message-end' : ''}`}>
      <div className={props.user ? 'message-right' : 'message-left'}>
        <Avatar icon={props.user ? <UserOutlined /> : <MessageOutlined />} />
        <div className="message-content">
          <p className="message-text">{props.message}</p>
        </div>
      </div>
    </div>
  );
}

export default ChatMessage;