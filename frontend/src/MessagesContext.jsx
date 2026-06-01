import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const MessagesContext = createContext();

export const useMessages = () => useContext(MessagesContext);

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

export const MessagesProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  const loadMessages = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      setMessages([]);
      return;
    }

    try {
      const response = await axios.get(`${BACKEND_URL}/api/messages`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessages(Array.isArray(response.data) ? response.data : []);
    } catch {
      setMessages([]);
    }
  };

  useEffect(() => {
    loadMessages();
    const refreshTimer = window.setInterval(loadMessages, 15000);

    return () => {
      window.clearInterval(refreshTimer);
    };
  }, []);

  return (
    <MessagesContext.Provider value={{ messages, setMessages, refreshMessages: loadMessages }}>
      {children}
    </MessagesContext.Provider>
  );
};