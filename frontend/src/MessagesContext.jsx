import { createContext, useContext, useEffect, useState } from 'react';
import socket from './socket';

const MessagesContext = createContext();

export const useMessages = () => useContext(MessagesContext);

export const MessagesProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.connect();
    socket.on('initMessages', (msgs) => setMessages(msgs));
    socket.on('messageBroadcast', (msg) => {
      setMessages(prev => [...prev.slice(-99), msg]);
    });

    return () => {
      socket.off('initMessages');
      socket.off('messageBroadcast');
    };
  }, []);

  return (
    <MessagesContext.Provider value={{ messages, setMessages }}>
      {children}
    </MessagesContext.Provider>
  );
};