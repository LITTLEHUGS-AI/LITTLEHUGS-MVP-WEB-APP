import { Navigate } from 'react-router-dom';

const OpenRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('accessToken');
  const userType = localStorage.getItem('userType');

  if (isAuthenticated) {
    if (userType === 'personal') {
      return <Navigate to="/personal/dashboard" replace />;
    }
    if (userType === 'partner') {
      return <Navigate to="/partner/dashboard" replace />;
    }
  }

  return children;
};

export default OpenRoute;
