import { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AuthenticatedRoutes from './routes/authenticated.routes';
import UnauthenticatedRoutes from './routes/unauthenticated.routes';
import SocketStates from './context/socket.context/socket.state';
import { useUserContext } from './context/user.context';
import { getItemFromLocalStorage } from './utils';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const { state, handleSetUser, handleSetToken } = useUserContext();
  const { token } = state

  useEffect(() => {
    const fetchUser = async () => {
      let response: any = await getItemFromLocalStorage('user');
      response = await JSON.parse(response)
      
      if (!!response) {
        handleSetUser({ ID: response.user.ID, name: response.user.name });
        handleSetToken(response.token);
      };
    }
    fetchUser();
  }, [])
  
  return (
    <SocketStates>
        <Router>
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          />
            {token ? <AuthenticatedRoutes /> : <UnauthenticatedRoutes />}
        </Router>
    </SocketStates>
  );
}

export default App