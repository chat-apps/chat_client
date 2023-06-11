import React, { useContext } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AuthenticatedRoutes from './routes/authenticated.routes';
import UnauthenticatedRoutes from './routes/unauthenticated.routes';
import UserStates from './context/user.context/socket.state';
import SocketStates from './context/socket.context/socket.state';
import UserContext from './context/user.context';

function App() {
  const { state } = useContext(UserContext)
  const { token } = state
  console.log(token)

  return (
    <UserStates>
      <SocketStates>
        <Router>
            {token ? <AuthenticatedRoutes /> : <UnauthenticatedRoutes />}
        </Router>
      </SocketStates>
    </UserStates>
  );
}

export default App;
