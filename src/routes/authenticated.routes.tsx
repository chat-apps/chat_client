import { Route, Routes } from 'react-router-dom';
import ChatPage from '../pages/Rooms';

const AuthenticatedRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ChatPage />} />
    </Routes>
  );
};

export default AuthenticatedRoutes;
