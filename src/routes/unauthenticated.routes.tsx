import { Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/Login';
import SignUpPage from '../pages/signup';

const UnAuthenticatedRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
    </Routes>
  );
};

export default UnAuthenticatedRoutes;
