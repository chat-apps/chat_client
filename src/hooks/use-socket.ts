import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import { OnlineUsersResponse } from './types';

const useSocket = (socketUrl: string, userID: number) => {
  const [socket, setSocket] = useState<Socket<any>>();
  const [activeUsers, setActiveUsers] = useState<OnlineUsersResponse[]>([]);

  useEffect(() => {
    const newSocket = io(socketUrl);
    newSocket.on('activeUsers', (users) => {
      setActiveUsers(users);
    });

    setSocket(newSocket);
    newSocket.emit('join', userID);

  }, [socketUrl, userID]);

  const disconnect = (id: number) => {
    if (socket) {
      socket.emit('disconnect', id)
    }
  }


  return { socket, activeUsers, disconnect };
};

export default useSocket;
