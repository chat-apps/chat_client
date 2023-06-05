import React, { createContext, useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AuthenticatedRoutes from './routes/authenticated.routes';
import UnauthenticatedRoutes from './routes/unauthenticated.routes';
import { getItemFromLocalStorage } from './utils';
import { AppContextType } from './types';

export const AppContext = createContext<AppContextType>({
  token: '',
  setAuthToken: (newToken: string) => {}
});

function App() {
  const [user, setUser] = useState(false);
  const [token, setToken] = useState('');

  const setAuthToken = (item: string) => {
    setToken(item);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const response = await getItemFromLocalStorage('user');
      setUser(!!response);
    };

    fetchUser();
  }, [token]);

  return (
    <AppContext.Provider value={{ token, setAuthToken }}>
    <Router>
        {user ? <AuthenticatedRoutes /> : <UnauthenticatedRoutes />}
    </Router>
    </AppContext.Provider>
  );
}

export default App;
