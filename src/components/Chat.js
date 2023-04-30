import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [recipient, setRecipient] = useState('');
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/messages/?recipient=${recipient}`);
        setMessages(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (recipient) {
      fetchMessages();
    }
  }, [recipient]);

  const handleSendMessage = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/messages/', {
        content: newMessage,
        recipient: recipient,
      });
      console.log(response.data);
      setNewMessage('');
      setMessages([...messages, response.data]);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return (
    <div>
      <h2>Chat</h2>
      <input
        type="text"
        value={recipient}
        onChange={(event) => setRecipient(event.target.value)}
        placeholder="Recipient username"
      />
      <ul>
        {messages.map((message) => (
          <li key={message.id}>{message.content}</li>
        ))}
      </ul>
      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          value={newMessage}
          onChange={(event) => setNewMessage(event.target.value)}
          placeholder="Type a message"
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;
