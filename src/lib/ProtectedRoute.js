import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('accessToken'); // or whatever key you use

  return isAuthenticated ? children : <Navigate to="/signin" replace />;
};

export default ProtectedRoute;