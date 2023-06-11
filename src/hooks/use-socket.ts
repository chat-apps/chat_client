import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

const useSocket = (socketUrl: string) => {
  const [socket, setSocket] = useState<Socket<any>>();
  const [activeUsers, setActiveUsers] = useState([]);

  useEffect(() => {
    const newSocket = io(socketUrl);

    newSocket.on('activeUsers', (users) => {
      setActiveUsers(users);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [socketUrl]);

  const join = (id: number) => {
    if (socket) {
      socket.emit('join', id);
    }
  };

  return { socket, activeUsers, join };
};

export default useSocket;
