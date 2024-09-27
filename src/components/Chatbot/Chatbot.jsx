import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Avatar, Button, Input } from "antd";
import { CloseOutlined } from '@ant-design/icons';
import robotImage from '../../assets/chatbot_8943377.png';
import ChatMessage from "../ChatMessage/ChatMessage";
import { analyze } from "./Utils";
import './chatbotStyles.css';

function Chatbot() {
  const [messages, setMessages] = useState([
    {
      message: 'Hola, ¿Cuál es tu nombre?',
    },
  ]);
  const [text, setText] = useState('');
  const [chatOpen, setChatOpen] = useState(false);
  const [chatClosed, setChatClosed] = useState(false);
  const [conversationEnded, setConversationEnded] = useState(false);
  const { TextArea } = Input;
  const navigate = useNavigate();

  useEffect(() => {
    const chatContainer = document.querySelector('.chat-message-container');
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    if (chatClosed) {
      setMessages([
        {
          message: 'Bienvenido a EzRental, ¿Cuál es tu nombre?',
        },
      ]);
      setText('');
      setChatClosed(false);
      setConversationEnded(false);
    }
  }, [messages, chatClosed]);

  const onSend = () => {
    if (conversationEnded) {
      return;
    }

    let list = [...messages, { message: text, user: true }];

    if (list.length > 2) {
      const reply = analyze(text);
      list = [...list, { message: reply }];

      if (reply === 'Historial de Reservas') {
        navigate('/mis-reservas');
      } else if (reply === 'Home') {
        navigate('/');
      } else if (reply === 'Mis Anuncios') {
        navigate('/mis-anuncios');
      } else if (reply === 'Añadir Anuncio') {
        navigate('/aniadir-anuncio');
      }else if (reply === 'Gestionar Residencias Reservadas') {
        navigate('/myRents'); 
      }else if (text.toLowerCase().includes('salir') || text.includes('7')) {
        setConversationEnded(true);
      }
    } else {
      list = [
        ...list,
        {
          message: `Hola, ${text}`,
        },
        {
          message: "¿Cómo puedo ayudarte?",
        },
        {
          message: [
            <span key="menu" style={{ fontWeight: 'bold' }}>Elige una opción como usuario:</span>,
            <span key="guest" style={{ fontWeight: 'bold' }}>Huésped:</span>,
            "1. Home",
            "2. Historial de Reservas",
            <span key="host" style={{ fontWeight: 'bold' }}>Anfitrión:</span>,
            "3. Añadir Anuncio",
            "4. Mis Anuncios",
            "5. Gestionar Residencias Reservadas",
            <span key="options" style={{ fontWeight: 'bold' }}>Otras opciones:</span>,
            "6. Ayuda",
            "7. Salir"
          ].map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          )),
        },
      ];
    }

    setMessages(list);
    setText('');
  };

  const toggleChat = () => {
    setChatOpen(!chatOpen);
    if (!chatOpen) {
      setChatClosed(false);
    }
  };

  const closeChat = () => {
    setChatOpen(false);
    setChatClosed(true);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSend();
    }
  };

  return (
    <>
      <Button
        className="toggle-chat-button"
        type="primary"
        shape="circle"
        onClick={toggleChat}>
        {chatOpen ? "Cerrar Chat" : <Avatar src={robotImage} />}
      </Button>

      {chatOpen && (
        <div className="chat-message-container">
          <div className="chat-message">
            <div className="chat-header chat-header-container">
              <div>
                <img
                  className="chatbot-image"
                  src={robotImage}
                  alt="imagen de chatbot"
                  height={80}
                  width={80}
                />

              </div>
              <h2 className="title-chatbot">Chatbot</h2>
              <Button
                className="float-btn-chatbot"
                type="primary"
                shape="circle"
                onClick={closeChat}
              >
                <CloseOutlined />
              </Button>
            </div>
            {messages.length > 0 && messages.map((data, index) => <ChatMessage key={index} {...data} />)}
            <div className="chatbot-text-area">
              <TextArea
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={conversationEnded}
                autoSize={{ minRows: 1, maxRows: 3 }}
              />
              <Button
                className="btn-send"
                type="primary"
                onClick={onSend}
                disabled={conversationEnded}>
                Enviar
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Chatbot;
